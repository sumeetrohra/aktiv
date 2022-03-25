import React, { useEffect } from "react";
import {
  BackHandler,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Image as APIImage } from "../api/index";

interface ImageDetailsProps {
  image: APIImage;
  clearImage: () => void;
}

const ImageDetails: React.FC<ImageDetailsProps> = (props) => {
  const { image, clearImage } = props;

  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round(
    (dimensions.width / image.webformatWidth) * image.webformatHeight
  );
  const imageWidth = dimensions.width;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        clearImage();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView style={styles.imageContainer}>
      <Image
        style={{
          width: imageWidth - 20,
          height: imageHeight,
          marginTop: 10,
        }}
        source={{ uri: image.webformatURL }}
        resizeMode={"cover"}
      />
      <View style={styles.userContainer}>
        {!!image.userImageURL && (
          <Image
            source={{ uri: image.userImageURL }}
            style={styles.userImage}
          />
        )}
        <Text style={styles.userName}>{image.user}</Text>
      </View>
      <Text style={styles.infoHeader}>Resolution</Text>
      <View style={styles.resolutionDetails}>
        <Text>Width: {image.webformatWidth} </Text>
        <Text> Height: {image.webformatHeight}</Text>
      </View>
      <Text style={styles.infoHeader}>Tags</Text>
      <View style={styles.tagsContainer}>
        {image.tags.split(",").map((tag) => (
          <Text key={tag} style={styles.tagDetails}>
            {tag.trim()}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tagDetails: {
    padding: 12,
    borderRadius: 50,
    borderColor: "#ddd",
    backgroundColor: "#eee",
    color: "#000",
    marginRight: 8,
    borderWidth: 1,
  },
  tagsContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
  },
  resolutionDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  infoHeader: { fontSize: 18, fontWeight: "bold" },
  imageContainer: { paddingLeft: 10, paddingRight: 10 },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  userImage: { width: 80, height: 80, borderRadius: 50, marginRight: 10 },
  userName: { fontSize: 24, fontWeight: "bold" },
});

export default ImageDetails;
