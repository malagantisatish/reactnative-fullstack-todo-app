import { ThemeProvider } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Constants from "expo-constants";


const convexUrl =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_CONVEX_URL;


const convex = new ConvexReactClient(convexUrl!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </ConvexProvider>
  );
}