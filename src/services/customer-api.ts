'use server';

import type { CustomerResponse, CustomersResponse } from '@/types/subscription';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { db } from '@/db/drizzle';
import { customers as customersTable } from '@/db/schema';
import { authOptions } from '@/lib/auth';

/**
 * 获取当前用户在指定支付提供商的客户信息
 * @param provider 支付提供商，如'stripe'
 * @returns 客户信息响应
 */
export async function getCustomer(provider: string): Promise<CustomerResponse> {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore - 我们知道session.user中实际上有id字段
    const userId = session?.user?.id;
    if (!userId) {
      return {
        success: false,
        error: '未授权访问',
      };
    }

    const result = await db.query.customers.findFirst({
      where: and(
        eq(customersTable.userId, userId),
        eq(customersTable.provider, provider),
        eq(customersTable.isActive, true),
      ),
    });

    if (!result) {
      return {
        success: false,
        error: '未找到客户信息',
      };
    }

    return {
      success: true,
      data: {
        id: result.id,
        userId: result.userId,
        provider: result.provider,
        customerId: result.customerId,
        customerEmail: result.customerEmail || undefined,
        customerName: result.customerName || undefined,
        metadata: result.metadata as Record<string, any> || {},
        defaultPaymentMethod: result.defaultPaymentMethod || undefined,
        isActive: result.isActive,
      },
    };
  } catch (error) {
    console.error('获取客户信息失败:', error);
    return {
      success: false,
      error: '获取客户信息失败',
    };
  }
}

/**
 * 获取当前用户的所有客户信息
 * @returns 所有客户信息响应
 */
export async function getCustomers(): Promise<CustomersResponse> {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore - 我们知道session.user中实际上有id字段
    const userId = session?.user?.id;
    if (!userId) {
      return {
        success: false,
        error: '未授权访问',
      };
    }

    const results = await db.query.customers.findMany({
      where: and(
        eq(customersTable.userId, userId),
        eq(customersTable.isActive, true),
      ),
    });

    return {
      success: true,
      data: results.map(result => ({
        id: result.id,
        userId: result.userId,
        provider: result.provider,
        customerId: result.customerId,
        customerEmail: result.customerEmail || undefined,
        customerName: result.customerName || undefined,
        metadata: result.metadata as Record<string, any> || {},
        defaultPaymentMethod: result.defaultPaymentMethod || undefined,
        isActive: result.isActive,
      })),
    };
  } catch (error) {
    console.error('获取客户列表失败:', error);
    return {
      success: false,
      error: '获取客户列表失败',
    };
  }
}

/**
 * 创建或更新客户信息
 * @param provider 支付提供商
 * @param customerId 客户ID
 * @param data 客户数据
 * @returns 客户信息响应
 */
export async function createOrUpdateCustomer(
  provider: string,
  customerId: string,
  data: {
    customerEmail?: string;
    customerName?: string;
    metadata?: Record<string, any>;
    defaultPaymentMethod?: string;
  },
): Promise<CustomerResponse> {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore - 我们知道session.user中实际上有id字段
    const userId = session?.user?.id;
    if (!userId) {
      return {
        success: false,
        error: '未授权访问',
      };
    }

    // 查找现有客户
    const existingCustomer = await db.query.customers.findFirst({
      where: and(
        eq(customersTable.userId, userId),
        eq(customersTable.provider, provider),
      ),
    });

    let result;

    if (existingCustomer) {
      // 更新现有客户
      const updatedResults = await db
        .update(customersTable)
        .set({
          customerId,
          customerEmail: data.customerEmail,
          customerName: data.customerName,
          metadata: data.metadata as any,
          defaultPaymentMethod: data.defaultPaymentMethod,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(customersTable.userId, userId),
            eq(customersTable.provider, provider),
          ),
        )
        .returning();

      result = updatedResults[0];
    } else {
      // 创建新客户
      const insertedResults = await db
        .insert(customersTable)
        .values({
          userId,
          provider,
          customerId,
          customerEmail: data.customerEmail,
          customerName: data.customerName,
          metadata: data.metadata as any,
          defaultPaymentMethod: data.defaultPaymentMethod,
          isActive: true,
        })
        .returning();

      result = insertedResults[0];
    }

    if (!result) {
      return {
        success: false,
        error: '创建或更新客户信息失败',
      };
    }

    return {
      success: true,
      data: {
        id: result.id,
        userId: result.userId,
        provider: result.provider,
        customerId: result.customerId,
        customerEmail: result.customerEmail || undefined,
        customerName: result.customerName || undefined,
        metadata: result.metadata as Record<string, any> || {},
        defaultPaymentMethod: result.defaultPaymentMethod || undefined,
        isActive: result.isActive,
      },
    };
  } catch (error) {
    console.error('创建或更新客户信息失败:', error);
    return {
      success: false,
      error: '创建或更新客户信息失败',
    };
  }
}

/**
 * 删除客户信息（软删除）
 * @param provider 支付提供商
 * @returns 删除操作响应
 */
export async function deleteCustomer(provider: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore - 我们知道session.user中实际上有id字段
    const userId = session?.user?.id;
    if (!userId) {
      return {
        success: false,
        error: '未授权访问',
      };
    }

    await db
      .update(customersTable)
      .set({
        isActive: false,
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(customersTable.userId, userId),
          eq(customersTable.provider, provider),
        ),
      );

    return {
      success: true,
    };
  } catch (error) {
    console.error('删除客户信息失败:', error);
    return {
      success: false,
      error: '删除客户信息失败',
    };
  }
}
