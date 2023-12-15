import { Suspense, lazy, useState } from "react";
import { View, ScrollView, SafeAreaView, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import {COLORS, icons, images, SIZES} from '../constants';
import { Popularjobs, Welcome, ScreenHeaderBtn } from "../screens";

const LazyNearbyJobs = lazy(() => import('../screens/home/nearby/Nearbyjobs'));
const LazyPopularJobs = lazy(() => import('../screens/home/popular/Popularjobs'));

const Home = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    return (
        <SafeAreaView  style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    // headerLeft: () => (
                    //     <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    // ),
                    // headerRight: () => (
                    //     <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    // ),
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
                        <Welcome
                            searchTerm={search}
                            setSearchTerm={setSearch}
                            handleClick={() => {
                                if(search){
                                    router.push(`/search/${search}`)
                                }
                            }}
                        />
                        <Suspense fallback={<ActivityIndicator />}>
                            {/* <LazyPopularJobs />
                            <LazyNearbyJobs /> */}
                        </Suspense>
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;