import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useActions, useTypedSelector } from "../state";
import Input from "./Input";
import { Image as APIImage } from "../api";
import ImageDetails from "./ImageDetails";
import {
  addOrientationChangeListener,
  removeOrientationChangeListener,
} from "expo-screen-orientation";

const ImageList = () => {
  const { data, loading, page, term, hasMore } = useTypedSelector(
    (state) => state.images
  );

  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const listener = addOrientationChangeListener((event) =>
      setDimensions(Dimensions.get("window"))
    );

    return () => removeOrientationChangeListener(listener);
  }, []);

  const { searchMoreImages } = useActions();

  const loadMoreItems = () => {
    if (hasMore && !loading) {
      searchMoreImages(term, page + 1);
    }
  };

  const [selectedImage, setSelectedImage] = useState<APIImage | null>();

  const selectedImageIndex = useRef(0);

  const clearImage = () => setSelectedImage(null);

  const flatListRef = useRef(null);

  useEffect(() => {
    if (!selectedImage && flatListRef.current && data.length > 0) {
      (flatListRef.current as FlatList).scrollToIndex({
        animated: false,
        index: selectedImageIndex.current,
      });
    }
  }, [selectedImage]);

  const handleImageClick = (image: APIImage, index: number) => {
    setSelectedImage(image);
    selectedImageIndex.current = index;
  };

  return selectedImage ? (
    <ImageDetails image={selectedImage} clearImage={clearImage} />
  ) : (
    <FlatList
      ref={flatListRef}
      data={data}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
          (flatListRef.current as any)?.scrollToIndex({
            index: info.index,
            animated: false,
          });
        });
      }}
      renderItem={({ item, index }) => {
        const imageHeight = Math.round(
          (dimensions.width / item.webformatWidth) * item.webformatHeight
        );
        const imageWidth = dimensions.width;
        return (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => handleImageClick(item, index)}
          >
            <Image
              style={{
                width: imageWidth - 20,
                height: imageHeight,
                marginTop: 10,
              }}
              source={{ uri: item.webformatURL }}
              resizeMode={"cover"}
            />
            {hasMore && loading && (
              <ActivityIndicator size="large" color="#005194" />
            )}
            {!hasMore &&
              index === data.length - 1 &&
              Array.isArray(data) &&
              data.length > 0 && <Text>That's it folks</Text>}
          </TouchableOpacity>
        );
      }}
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <View style={[styles.container, styles.horizontal]}>
          {loading ? (
            <ActivityIndicator size="large" color="#005194" />
          ) : (
            <Text>Please search something</Text>
          )}
        </View>
      }
      ListHeaderComponent={<Input />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: 40,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  imageContainer: { paddingLeft: 10, paddingRight: 10 },
});

export default ImageList;
