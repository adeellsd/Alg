'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';
import {
  LayoutDashboard,
  Search,
  Heart,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  Home,
  Building2,
  TrendingUp,
  Star,
  Zap,
} from 'lucide-react';
import type { AccountTier, User as UserType } from '@/types/prismaTypes';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

interface AppSidebarProps {
  accountTier: AccountTier;
  userInfo: UserType;
}

const tierLabels: Record<AccountTier, { label: string; color: string }> = {
  FREE: { label: 'Particulier', color: 'bg-gray-500' },
  STARTER: { label: 'Pro Starter', color: 'bg-blue-500' },
  PRO: { label: 'Pro', color: 'bg-purple-500' },
  ELITE: { label: 'Elite', color: 'bg-amber-500' },
};

// Menu items based on tier
const getMenuItems = (tier: AccountTier) => {
  const isPro = tier !== 'FREE';
  
  if (isPro) {
    return [
      { title: 'Dashboard', url: '/pro', icon: LayoutDashboard },
      { title: 'Mes Annonces', url: '/pro/properties', icon: Building2 },
      { title: 'Statistiques', url: '/pro/stats', icon: TrendingUp },
      { title: 'Boosts', url: '/pro/boosts', icon: Zap, badge: tier === 'ELITE' ? 'Illimité' : undefined },
      { title: 'Messages', url: '/messages', icon: MessageSquare },
    ];
  }
  
  return [
    { title: 'Dashboard', url: '/particulier', icon: LayoutDashboard },
    { title: 'Recherches', url: '/particulier/searches', icon: Search },
    { title: 'Favoris', url: '/favorites', icon: Heart },
    { title: 'Messages', url: '/messages', icon: MessageSquare },
  ];
};

const bottomMenuItems = [
  { title: 'Profil', url: '/profile', icon: User },
  { title: 'Paramètres', url: '/settings', icon: Settings },
];

export function AppSidebar({ accountTier, userInfo }: AppSidebarProps) {
  const pathname = usePathname();
  const items = getMenuItems(accountTier);
  const tierInfo = tierLabels[accountTier];

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/landing';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/landing">
                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-linear-to-br from-blue-electric to-blue-bright text-white shadow-md">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-foreground">RENTALG</span>
                  <Badge variant="secondary" className={`text-[10px] ${tierInfo.color} text-white border-0`}>
                    {tierInfo.label}
                  </Badge>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} className="transition-colors">
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="outline" className="ml-auto text-[10px]">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Bottom Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600">Compte</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} className="transition-colors">
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} className="text-terracotta hover:bg-terracotta/10 hover:text-terracotta transition-colors">
              <LogOut className="size-4" />
              <span>Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
