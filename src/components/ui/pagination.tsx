'use client';

import { faChevronLeft, faChevronRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  // 生成页码数组
  const getPageNumbers = () => {
    const pageNumbers = [];

    // 始终显示第一页
    pageNumbers.push(1);

    // 计算显示的页码范围
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // 处理边界情况
    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
    }

    // 添加省略号（如果需要）
    if (startPage > 2) {
      pageNumbers.push('ellipsis-start');
    }

    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // 添加省略号（如果需要）
    if (endPage < totalPages - 1) {
      pageNumbers.push('ellipsis-end');
    }

    // 始终显示最后一页（如果总页数大于1）
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // 处理页码点击
  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // 如果只有一页，不显示分页
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={cn('flex justify-center items-center my-8', className)}>
      <ul className="flex items-center space-x-1">
        {/* 上一页按钮 */}
        <li>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-10 w-10 rounded-md',
              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-primary-600',
            )}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </li>

        {/* 页码按钮 */}
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === 'ellipsis-start' || page === 'ellipsis-end'
              ? (
                  <span className="flex size-10 items-center justify-center text-gray-500">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </span>
                )
              : (
                  <Button
                    variant={currentPage === page ? 'default' : 'ghost'}
                    className={cn(
                      'h-10 w-10 rounded-md',
                      currentPage === page
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'text-gray-600 hover:text-primary-600',
                    )}
                    onClick={() => handlePageClick(page as number)}
                  >
                    {page}
                  </Button>
                )}
          </li>
        ))}

        {/* 下一页按钮 */}
        <li>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-10 w-10 rounded-md',
              currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-primary-600',
            )}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
