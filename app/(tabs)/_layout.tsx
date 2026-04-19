import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LayoutDashboard, DollarSign, ArrowLeftRight, FileSearch } from 'lucide-react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        tabBarStyle: {
          backgroundColor: '#1e3a5f',
          borderTopColor: 'rgba(255,255,255,0.1)',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#1e3a5f',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShown: true,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
          tabBarIcon: ({ color }) => <DollarSign size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <ArrowLeftRight size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="audits"
        options={{
          title: 'Audits',
          tabBarIcon: ({ color }) => <FileSearch size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
