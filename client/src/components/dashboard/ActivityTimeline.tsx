"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, MessageSquare, Search, Bell, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActivityItem {
  id: string;
  type: 'favorite' | 'message' | 'search' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'favorite':
        return <Heart className="w-5 h-5 text-[#DC2626]" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-[#10B981]" />;
      case 'search':
        return <Search className="w-5 h-5 text-[#0891B2]" />;
      case 'alert':
        return <Bell className="w-5 h-5 text-[#F97316]" />;
      default:
        return <Plus className="w-5 h-5 text-gray-400" />;
    }
  };

  const getIconBg = (type: ActivityItem['type']) => {
    switch (type) {
      case 'favorite':
        return 'bg-gradient-to-br from-red-50 to-red-100';
      case 'message':
        return 'bg-gradient-to-br from-[#D1FAE5] to-[#10B981]/20';
      case 'search':
        return 'bg-gradient-to-br from-[#CFFAFE] to-[#06B6D4]/20';
      case 'alert':
        return 'bg-gradient-to-br from-[#FFEDD5] to-[#F97316]/20';
      default:
        return 'bg-gray-100';
    }
  };

  const getGlowColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'favorite':
        return 'from-[#DC2626]/20 to-transparent';
      case 'message':
        return 'from-[#10B981]/20 to-transparent';
      case 'search':
        return 'from-[#0891B2]/20 to-transparent';
      case 'alert':
        return 'from-[#F97316]/20 to-transparent';
      default:
        return 'from-gray-200/20 to-transparent';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `Il y a ${minutes} min`;
    } else if (hours < 24) {
      return `Il y a ${hours}h`;
    } else {
      const days = Math.floor(hours / 24);
      return `Il y a ${days}j`;
    }
  };

  return (
    <Card className="relative border-0 shadow-lg overflow-hidden">
      {/* Gradient header */}
      <div className="relative p-6 bg-gradient-to-r from-[#0891B2] via-[#06B6D4] to-[#10B981]">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        <h3 className="relative text-xl font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Activité Récente
        </h3>
      </div>
      
      <div className="p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full blur-xl opacity-50" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-500 font-medium">Aucune activité récente</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${getGlowColor(activity.type)} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
              
              <div className="relative flex gap-4 p-4 bg-white rounded-xl border border-gray-100 group-hover:border-gray-200 group-hover:shadow-md transition-all duration-300">
                {/* Icon with gradient background */}
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 ${getIconBg(activity.type)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    {getIcon(activity.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">
                      {activity.title}
                    </h4>
                    <span className="text-xs font-semibold text-gray-400 shrink-0 bg-gray-50 px-2 py-1 rounded-full">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {activity.description}
                  </p>
                  {activity.link && (
                    <a
                      href={activity.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0891B2] hover:text-[#06B6D4] mt-2 group-hover:gap-2 transition-all"
                    >
                      Voir plus
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
};

export default ActivityTimeline;
