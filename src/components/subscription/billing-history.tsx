'use client';

import type { BillingHistoryItem } from '@/types/subscription';
import { useLocale, useTranslations } from 'next-intl';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type BillingHistoryProps = {
  billingHistory: BillingHistoryItem[];
  isLoading?: boolean;
};

export function BillingHistory({ billingHistory, isLoading = false }: BillingHistoryProps) {
  const t = useTranslations('Subscription');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const locale = useLocale();

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 格式化金额
  const formatAmount = (amount: number, currency: string) => {
    return `${currency === 'CNY' ? '¥' : '$'}${amount.toFixed(2)}`;
  };

  // 获取状态标签
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50">
            {t('succeeded')}
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50">
            {t('failed')}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50">
            {t('pending')}
          </Badge>
        );
      case 'refunded':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
            {t('refunded')}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // 切换排序
  const toggleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // 排序和过滤账单历史
  const filteredAndSortedHistory = billingHistory
    .filter(item =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
      || formatDate(item.createdAt).toLowerCase().includes(searchTerm.toLowerCase())
      || item.status.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return sortDirection === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });

  // 获取排序图标
  const getSortIcon = (field: 'date' | 'amount') => {
    if (sortField !== field) {
      return null;
    }

    return sortDirection === 'asc'
      ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 inline size-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        )
      : (
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 inline size-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
  };

  if (isLoading) {
    return (
      <Card className="border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-9 w-56" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (billingHistory.length === 0) {
    return (
      <Card className="border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">{t('billing_history')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-3 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">{t('no_billing_history')}</h3>
            <p className="mb-6 max-w-md text-gray-500 dark:text-gray-400">{t('no_billing_records')}</p>
            <Button variant="outline" className="border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              {t('view_subscription_plan')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalSpent = billingHistory
    .filter(item => (item.status === 'succeeded' || item.status === 'active'))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const mostCommonCurrency = billingHistory.length > 0 ? billingHistory[0]?.currency || 'CNY' : 'CNY';

  return (
    <Card className="border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">{t('billing_history')}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('total_transactions')}
            :
            {billingHistory.length}
            {' '}
            ·
            {t('total_spent')}
            :
            {formatAmount(totalSpent / 100.0, mostCommonCurrency)}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder={t('search_transactions')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="h-9 w-full sm:w-56"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-0 gap-1 sm:ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 size-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                {t('filter')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => toggleSort('date')}>
                {t('sort_by_date')}
                {' '}
                {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort('amount')}>
                {t('sort_by_amount')}
                {' '}
                {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 bg-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800/50">
                <TableHead
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => toggleSort('date')}
                >
                  <div className="flex items-center">
                    {t('date')}
                    {getSortIcon('date')}
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">{t('details')}</TableHead>
                <TableHead
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => toggleSort('amount')}
                >
                  <div className="flex items-center">
                    {t('amount')}
                    {getSortIcon('amount')}
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">{t('status')}</TableHead>
                <TableHead className="whitespace-nowrap">{t('action')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedHistory.length === 0
                ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3 text-center">
                          <div className="rounded-full bg-gray-100 p-2 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">{t('no_transactions_found')}</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                : (
                    filteredAndSortedHistory.map(item => (
                      <TableRow
                        key={item.id}
                        className="border-b border-gray-100 transition-colors hover:bg-gray-50/50 dark:border-gray-700 dark:hover:bg-gray-800/70"
                      >
                        <TableCell className="whitespace-nowrap font-medium">
                          <div className="flex flex-col">
                            <span className="text-gray-900 dark:text-gray-100">{formatDate(item.createdAt)}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(item.createdAt).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate">
                            {item.description}
                          </div>
                        </TableCell>
                        <TableCell className={`whitespace-nowrap font-semibold ${
                          item.status === 'refunded'
                            ? 'text-blue-600 dark:text-blue-400'
                            : item.amount > 0
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-green-600 dark:text-green-400'
                        }`}
                        >
                          {formatAmount(item.amount / 100, item.currency)}
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {item.invoiceUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(item.invoiceUrl, '_blank')}
                                className="h-8 border-gray-200 px-2 text-xs hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 size-3.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                                {t('invoice')}
                              </Button>
                            )}
                            {item.receiptUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(item.receiptUrl, '_blank')}
                                className="h-8 border-gray-200 px-2 text-xs hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 size-3.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                                {t('receipt')}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
