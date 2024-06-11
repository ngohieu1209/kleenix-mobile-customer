import { View, Text } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      // style={{ backgroundColor: '#FFEFCA', borderLeftColor: 'green', height: 'auto' }}
      style={{ backgroundColor: 'rgba(50, 50, 50, 0.6)', borderLeftColor: 'green', height: 'auto' }}
      contentContainerStyle={{ paddingVertical: 8 }}
      text1Style={{
        fontSize: 18,
        // color: '#008A64'
        color: '#fff'
      }}
      text1NumberOfLines={3}
      text2Style={{
        fontSize: 15
      }}
      text2NumberOfLines={3}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: 'rgba(50, 50, 50, 0.6)', borderLeftColor: 'red', height: 'auto' }}
      contentContainerStyle={{ paddingVertical: 8 }}
      text1Style={{
        fontSize: 18,
        // color: '#B10000'
        color: '#fff'
      }}
      text1NumberOfLines={3}
      text2Style={{
        fontSize: 15
      }}
      text2NumberOfLines={3}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

export default toastConfig;