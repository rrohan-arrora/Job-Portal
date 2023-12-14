import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator, RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  Text, View
} from 'react-native';
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

import {
  Company,
  JobAbout,
  JobTabs,
  JobFooter,
  ScreenHeaderBtn,
  Specifics
} from "../../screens";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);


    const {data, isLoading, error, refetch} = useFetch('job-details', {
        job_id: params.id
    })

    const handleShare = async () => {
        try {
          const result = await Share.share({
            message: `Check out this job: ${data[0]?.job_google_link}`,
          });
        } catch (error) {
          console.error('Error sharing:', error.message);
        }
      };

      const onRefresh = (() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
      }, []);

      const displayTabContent = () => {
        switch (activeTab) {
          case "Qualifications":
            return (
              <Specifics
                title='Qualifications'
                points={data[0].job_highlights?.Qualifications ?? ["Please check About section"]}
              />
            );
    
          case "About":
            return (
              <JobAbout info={data[0].job_description ?? "No data provided"} />
            );
    
          case "Responsibilities":
            return (
              <Specifics
                title='Responsibilities'
                points={data[0].job_highlights?.Responsibilities ?? ["Please check About section"]}
              />
            );
    
          default:
            return null;
        }
      };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension='60%'
                    handlePress={() => router.back()}
                />
                ),
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                            handlePress={handleShare}
                        />
                    </View>
                ),
                headerTitle: "",
            }}
            />
            <>
              <ScrollView showsVerticalScrollIndicator={false}
                  refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              >
                {isLoading ? (
                  <ActivityIndicator size='large' color={COLORS.primary} />
                ) : error ? (
                  <Text>Something went wrong</Text>
                ) : data.length === 0 ? (
                  <Text>No data available</Text>
                ) : (
                  <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                    <Company
                      companyLogo={data[0].employer_logo}
                      jobTitle={data[0].job_title}
                      companyName={data[0].employer_name}
                      location={data[0].job_country}
                    />

                    <JobTabs
                      tabs={tabs}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />

                    {displayTabContent()}
                  </View>
                )}
              </ScrollView>

              <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
            </>
        </SafeAreaView>
    )
}

export default JobDetails