import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EvilIcons } from "@expo/vector-icons";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

const requestMediaLibraryPermission = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === "granted";
};

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const detectPlatform = (url: string) => {
    if (url.includes("instagram.com")) {
      return "instagram";
    } else if (url.includes("twitter.com")) {
      return "twitter";
    } else if (url.includes("facebook.com")) {
      return "facebook";
    } else {
      return null;
    }
  };

  const downloadInstagram = async () => {
    // API request to Instagram downloader
    const options = {
      method: "GET",
      url: "https://instagram-downloader36.p.rapidapi.com/instagram",
      params: {
        insta_url: url,
      },
      headers: {
        "x-rapidapi-key": process.env.EXPO_PUBLIC_INSTA_X_RAPIDAPI_KEY,
        "x-rapidapi-host": "instagram-downloader36.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const downloadUrl = response.data.urls[0].download_url;

    if (!downloadUrl) {
      Alert.alert("Error", "Failed to retrieve download URL.");
      return;
    }

    await startDownload(downloadUrl);
  };

  const downloadTwitter = async () => {
    // API request to Twitter downloader (replace with actual API if available)
    const options = {
      method: "GET",
      url: "https://twitter-downloader-api.com/download", // Replace with the actual API
      params: {
        tweet_url: url,
      },
      headers: {
        Authorization: "Bearer YOUR_API_KEY", // Replace with your API key
      },
    };

    const response = await axios.request(options);
    const downloadUrl = response.data.download_url;

    if (!downloadUrl) {
      Alert.alert("Error", "Failed to retrieve download URL.");
      return;
    }

    await startDownload(downloadUrl);
  };

  const downloadFacebook = async () => {
    const options = {
      method: "POST",
      url: "https://facebook17.p.rapidapi.com/api/facebook/links",
      headers: {
        "x-rapidapi-key": process.env.EXPO_PUBLIC_FB_X_RAPIDAPI_KEY,
        "x-rapidapi-host": "facebook17.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        url: url,
      },
    };

    try {
      const response = await axios.request(options);
      const downloadUrl = response.data[0].urls[0].url; // Assuming the download URL is returned in response.data

      if (!downloadUrl) {
        Alert.alert("Error", "Failed to retrieve download URL.");
        return;
      }

      await startDownload(downloadUrl);
    } catch (error) {
      console.error("Facebook download error:", error);
      Alert.alert("Error", "Failed to download video from Facebook.");
    }
  };

  const startDownload = async (downloadUrl: string) => {
    // Create a path to save the video
    const fileNameWithExt = downloadUrl.split("/").pop();
    const fileName = fileNameWithExt?.includes(".")
      ? fileNameWithExt
      : `${fileNameWithExt}.mp4`; // Append .mp4 if missing
    const path = `${FileSystem.documentDirectory}${fileName}`;

    // Start downloading the video with progress tracking
    const downloadResumable = FileSystem.createDownloadResumable(
      downloadUrl,
      path,
      {},
      (progress) => {
        const percentProgress = (
          (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) *
          100
        ).toFixed(1);
        setDownloadProgress(parseInt(percentProgress));
      }
    );

    setIsDownloading(true);
    try {
      const downloadResponse = await downloadResumable.downloadAsync();
      if (downloadResponse?.status === 200) {
        // Save the file to the media library
        const asset = await MediaLibrary.createAssetAsync(downloadResponse.uri);
        console.log(asset);
        Alert.alert("Success", "Video downloaded and saved to your library!");
        // Optional: Share the downloaded file
        await Sharing.shareAsync(downloadResponse.uri);
      } else {
        Alert.alert("Error", "Failed to download video.");
      }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Failed to download video.");
    } finally {
      setIsDownloading(false);
      setUrl("");
    }
  };

  const handleDownload = async () => {
    // Request storage permission
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Media library permission is required.");
      return;
    }

    const platform = detectPlatform(url);
    if (platform === "instagram") {
      await downloadInstagram();
    } else if (platform === "twitter") {
      await downloadTwitter();
    } else if (platform === "facebook") {
      await downloadFacebook();
    } else {
      Alert.alert("Error", "Unsupported platform. Please enter a valid URL.");
    }
  };

  return (
    <View
      style={{
        marginTop: hp("2%"),
        flexDirection: "column",
        gap: hp("1.5%"),
      }}
    >
      <Text
        style={{
          fontSize: hp("2.5%"),
          fontWeight: "bold",
        }}
      >
        URL
      </Text>
      <View
        style={{
          width: wp("90%"),
          borderRadius: hp("3%"),
          paddingVertical: hp("2%"),
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          gap: wp("1%"),
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: hp("0.5%"),
          }}
        >
          <EvilIcons name="link" size={wp("6%")} color={"#E8AC41"} />
        </TouchableOpacity>
        <TextInput
          placeholder="Paste URL"
          style={{
            flex: 1,
            paddingRight: wp("4%"),
          }}
          value={url}
          onChangeText={(value) => setUrl(value)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: wp("2%"),
          marginTop: hp("2%"),
        }}
      >
        <View
          style={{
            borderColor: "#E8AC41",
            borderWidth: wp("0.3%"),
            borderRadius: hp("2%"),
            paddingHorizontal: wp("2%"),
            paddingVertical: hp("2%"),
            flex: 1 / 2,
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: "#E8AC41",
              }}
            >
              Paste Link
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderRadius: hp("2%"),
            paddingHorizontal: wp("2%"),
            paddingVertical: hp("2%"),
            flex: 1 / 2,
            backgroundColor: "#E8AC41",
          }}
        >
          <TouchableOpacity onPress={handleDownload}>
            {isDownloading ? (
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Progress: {downloadProgress}%
              </Text>
            ) : (
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Download
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UrlInput;
