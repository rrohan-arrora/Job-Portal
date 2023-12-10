import { Suspense, lazy, useState } from "react";
import { View, ScrollView, SafeAreaView, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import {COLORS, icons, images, SIZES} from '../constants';
import { Popularjobs, Welcome, ScreenHeaderBtn } from "../screens";

const LazyNearbyJobs = lazy(() => import('../screens/home/nearby/Nearbyjobs'));

const Home = () => {
    const router = useRouter();
    
    return (
        <SafeAreaView  style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                    headerTitle: ""
                }}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            flex: 1,
                            padding: SIZES.medium
                        }}
                    >
                        <Welcome />
                        <Popularjobs />
                        <Suspense fallback={<ActivityIndicator />}>
                            <LazyNearbyJobs />
                        </Suspense>
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;