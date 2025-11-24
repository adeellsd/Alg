'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuickAction {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  variant?: 'default' | 'outline';
}

interface QuickActionsProps {
  title: string;
  actions: QuickAction[];
}

export function QuickActions({ title, actions }: QuickActionsProps) {
  return (
    <Card className="p-6 bg-white border-0 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={index} href={action.href}>
              <Button
                variant={action.variant || 'outline'}
                className="w-full h-auto py-4 flex-col items-start gap-2 rounded-[14px] border-2"
              >
                <div className="flex items-center gap-2 w-full">
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{action.label}</span>
                </div>
                {action.description && (
                  <p className="text-xs text-left text-muted-foreground">
                    {action.description}
                  </p>
                )}
              </Button>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
