import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomIconButton from "@/components/CustomIconButton";
import { icons } from "@/constants";
import { router } from "expo-router";
const VIDEO_FOLDER = `${FileSystem.documentDirectory}/`;

const data = [
  {
    id: "1",
    title: "All",
  },
  {
    id: "2",
    title: "Facebook",
  },
  {
    id: "3",
    title: "Instagram",
  },
  {
    id: "4",
    title: "Twitter",
  },
  {
    id: "5",
    title: "Vimeo",
  },
];

const CategoryItem = ({ item, activeItem, setActiveItem }) => {
  return (
    <View
      style={{
        marginRight: wp("10%"),
      }}
    >
      <TouchableOpacity>
        <Text
          style={{
            fontSize: hp("2.2%"),
            color: "grey",
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(data[0]);

  // Function to load videos from the specific folder
  const loadVideosFromFolder = async () => {
    try {
      const folderExists = await FileSystem.getInfoAsync(VIDEO_FOLDER);
      if (!folderExists.exists) {
        console.log("Video folder does not exist");
        return;
      }

      const files = await FileSystem.readDirectoryAsync(VIDEO_FOLDER);
      const videoPaths = files
        .filter((file) => file.endsWith(".mp4")) // Only get files with .mp4 extension
        .map((file) => `${VIDEO_FOLDER}${file}`); // Create full paths to each video

      setVideos(videoPaths);
    } catch (error) {
      console.error("Error loading videos:", error);
    }
  };

  // Call the function to load videos when the component mounts
  useEffect(() => {
    loadVideosFromFolder();
  }, []);

  // Render each video in the list
  const RenderVideoItem = ({ item }) => {
    return (
      <View style={{ margin: wp("2%") }}>
        <Video
          source={{ uri: item }}
          style={{ width: wp("40%"), height: hp("25%") }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF9E3",
        paddingHorizontal: wp("4%"),
      }}
    >
      <View
        style={{
          marginTop: hp("3%"),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: hp("4%"),
        }}
      >
        <CustomIconButton
          icon={icons.leftArrow}
          onPress={() => router.back()}
          heightPercent="3%"
          widthPercent="3%"
        />
        <Text style={{ fontSize: hp("3%"), fontWeight: "bold" }}>Saved</Text>
        <CustomIconButton
          icon={icons.settingsIcon}
          heightPercent="3.5%"
          widthPercent="3.5%"
        />
      </View>
      <View
        style={{
          marginTop: hp("1%"),
          marginBottom: hp("2%"),
        }}
      >
        <FlatList
          data={data}
          horizontal
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              activeItem={selected}
              setActiveItem={setSelected}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      {videos.length > 0 ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {videos.map((item, index) => (
            <RenderVideoItem item={item} key={index} />
          ))}
        </View>
      ) : (
        <Text>No videos found in the folder</Text>
      )}
    </SafeAreaView>
  );
};

export default Saved;
