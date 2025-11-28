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

const tierLabels: Record<AccountTier, { label: string; gradient: string; badge: string }> = {
  FREE: { 
    label: 'Particulier', 
    gradient: 'from-beige-casbah to-beige-chaud',
    badge: 'bg-gray-500'
  },
  STARTER: { 
    label: 'Pro Starter', 
    gradient: 'from-blue-electric to-turquoise-mer',
    badge: 'bg-linear-to-r from-blue-electric to-turquoise-mer shadow-blue'
  },
  PRO: { 
    label: 'Pro', 
    gradient: 'from-purple-500 to-purple-700',
    badge: 'bg-linear-to-r from-purple-500 to-purple-700 shadow-lg'
  },
  ELITE: { 
    label: 'Elite', 
    gradient: 'from-or to-orange-brulant',
    badge: 'bg-linear-to-r from-or to-orange-brulant shadow-2xl'
  },
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
    <Sidebar collapsible="icon" className="border-r border-gray-200/50 glass-sidebar">
      {/* Pattern Checkers background subtil */}
      <div className="absolute inset-0 pattern-checkers opacity-[0.02] pointer-events-none" />
      
      {/* Header */}
      <SidebarHeader className="relative z-10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="group">
              <Link href="/landing">
                <div className={`flex aspect-square size-8 items-center justify-center rounded-[12px] bg-linear-to-br ${tierInfo.gradient} text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200`}>
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-gray-900 font-display">RENT<span className="text-or">ALG</span></span>
                  <Badge variant="secondary" className={`text-[10px] ${tierInfo.badge} text-white border-0 font-semibold`}>
                    {tierInfo.label}
                  </Badge>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="relative z-10">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      className={`transition-all duration-200 group ${
                        isActive 
                          ? `bg-linear-to-r ${tierInfo.gradient} text-white shadow-md hover:shadow-lg` 
                          : 'hover:bg-blue-pale/50'
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon className={`size-4 ${isActive ? 'text-white' : 'text-blue-electric'} group-hover:scale-110 transition-transform duration-200`} />
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge variant="outline" className="ml-auto text-[10px] bg-white/90 backdrop-blur-sm border-blue-electric/20 text-blue-electric font-semibold">
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

        <SidebarSeparator className="bg-linear-to-r from-transparent via-gray-300 to-transparent" />

        {/* Bottom Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold">Compte</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      className={`transition-all duration-200 group ${
                        isActive 
                          ? 'bg-linear-to-r from-purple-100 to-purple-200 text-purple-700' 
                          : 'hover:bg-beige-pale/50'
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon className={`size-4 ${isActive ? 'text-purple-700' : 'text-gray-600'} group-hover:scale-110 transition-transform duration-200`} />
                        <span className="font-medium">{item.title}</span>
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
      <SidebarFooter className="relative z-10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleSignOut} 
              className="text-terracotta-fonce hover:bg-terracotta-fonce/10 hover:text-terracotta-fonce hover:scale-105 transition-all duration-200 font-medium group"
            >
              <LogOut className="size-4 group-hover:rotate-12 transition-transform duration-200" />
              <span>Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
