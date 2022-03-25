import { useState } from "react";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  StyleSheet,
} from "react-native";
import useActions from "../state/hooks/useActions";
import useTypedSelector from "../state/hooks/useTypedSelector";

const Input = () => {
  const [term, setTerm] = useState("");

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    e.preventDefault();
    searchImages(term, 1);
  };

  const { searchImages } = useActions();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={term}
        onChangeText={(text) => setTerm(text)}
        onSubmitEditing={handleSubmit}
        placeholder="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 80,
    backgroundColor: "#005194",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 16,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default Input;
