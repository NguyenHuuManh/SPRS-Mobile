import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Field, Formik } from "formik";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import {
  SafeAreaView, ScrollView, Text, View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiCreateStore } from "../../ApiFunction/StorePoint";
import ButtonCustom from "../../Components/ButtonCustom";
import ContainerField from "../../Components/ContainerField";
import HeaderContainer from "../../Components/HeaderContainer";
import Input from "../../Components/Input";
import Loading from "../../Components/Loading";
import MapPicker from "../../Components/MapPicker";
import StoreCategory from "../../Components/StoreCategory";
import TimePicker from "../../Components/TimePicker";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../Constrants/DataGlobal";
import { checkLatLng } from "../../Helper/FunctionCommon";
import { AppColor } from "../../Helper/propertyCSS";
import { RootState } from "../../Redux/Reducers";
import { MainStyle } from "../../Style/main_style";
import styles from "../AddLocation/styles";
import MapView from "./components/MapView";
import { createStore } from "./validate";

const AddStorePoint = ({ navigation }) => {
  const addressCurrent = useSelector((state: RootState) => state.updateAddressReducer);
  // console.log("addressCurrent", addressCurrent.data);
  const [adressPoint, setAdressPoint] = useState({
    GPS_Lati: addressCurrent?.data?.GPS_lati,
    GPS_long: addressCurrent?.data.GPS_long,
    city: addressCurrent?.data?.city?.name || "",
    district: addressCurrent?.data?.district?.name || "",
    subDistrict: addressCurrent?.data?.subDistrict?.name || "",
  });
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any>([]);

  const callCreatePoint = (body) => {
    if (isEmpty(items)) {
      Toast.show({
        type: "error",
        text1: 'Ch???n ??t nh???t m???t lo???i s???n ph???m',
        position: "top"
      });
      return;
    }
    setLoading(true);
    apiCreateStore(body).then((res) => {
      console.log(res, "ressss")
      if (res.status == 200) {
        if (res.data.code == "200") {
          Toast.show({
            type: "success",
            text1: "T???o ??i???m c???a h??ng th??nh c??ng",
            position: "top"
          });
          navigation.goBack();
        }
      } else {
        Toast.show({
          type: "error",
          text1: res.data.message,
          position: "top"
        })
      }
    }).finally(() => { setLoading(false) });
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Loading isVisible={loading} />
      <View style={{ height: "7%" }}>
        <HeaderContainer
          flexRight={1}
          flexCenter={10}
          flexLeft={1}
          isBack
          centerEl={(
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#FFFF" }}>Th??m m???i c???a h??ng</Text>
            </View>
          )}
        />
      </View>

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[{ width: "100%", height: 180, backgroundColor: "FFFF", padding: 1, borderRadius: 10, marginTop: 20 }, MainStyle.boxShadow]}>
          <MapView
            defaultLocation={{
              latitude: Number(adressPoint.GPS_Lati),
              longitude: Number(adressPoint?.GPS_long),
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          />
        </View>
        <Formik
          initialValues={{
            open_time: "",
            close_time: "",
            status: 0,
            name: "SPRS",
            description: "",
          }}
          validationSchema={createStore}
          // validateOnChange={false}
          onSubmit={(values) => {
            if (!checkLatLng(adressPoint.GPS_Lati, adressPoint.GPS_long)) {
              Toast.show({
                type: "error",
                text1: 'B???n ch??a ch???n ?????a ??i???m, ho???c ?????a ??i???m ch??a h???p l???',
                position: "top"
              });
              return;
            }
            const body = {
              ...values,
              store_category: items.map((e) => {
                return {
                  id: e.id,
                  name: e.name
                }
              }),
              address: {
                city: {
                  code: "",
                  id: "",
                  name: adressPoint.city
                },
                district: {
                  code: "",
                  id: "",
                  name: adressPoint?.district,
                },
                subDistrict: {
                  code: "",
                  id: "",
                  name: adressPoint?.subDistrict,
                },
                addressLine: "",
                addressLine2: "",
                GPS_lati: adressPoint?.GPS_Lati,
                GPS_long: adressPoint?.GPS_long
              },
            }
            // console.log("body", body);
            callCreatePoint(body);
          }}
        >
          {({ submitForm }) => (
            <View style={{}}>
              <ContainerField title="T??n ??i???m">
                <Field
                  component={Input}
                  name="name"
                  horizontal
                  placeholder="T??n ??i???m c???u tr???"
                  styleTitle={{ width: 110 }}
                  maxLength={100}
                />
              </ContainerField>

              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <ContainerField title="Gi??? m??? c???a">
                    <Field
                      component={TimePicker}
                      name="open_time"
                      mode="time"
                      horizontal
                      placeholder="M??? c???a"
                      styleTitle={{ width: 110 }}
                    />
                  </ContainerField>
                </View>
                <View style={{ width: "50%", paddingLeft: 5 }}>
                  <ContainerField title="Gi??? ????ng c???a">
                    <Field
                      component={TimePicker}
                      name="close_time"
                      mode="time"
                      horizontal
                      placeholder="????ng c???a"
                      styleTitle={{ width: 110 }}
                    />
                  </ContainerField>
                </View>
              </View>


              <ContainerField title="Ch???n ?????a ??i???m">
                <MapPicker
                  styleTitle={{ width: 110 }}
                  horizontal
                  iconRight={faMapMarkedAlt}
                  iconSize={20}
                  setAdress={setAdressPoint}
                  adress={adressPoint}
                  defaultAdress={adressPoint}
                />
              </ContainerField>
              <ContainerField title="S???n ph???m">
                <StoreCategory items={items} setItems={setItems} />
              </ContainerField>
              <ContainerField title="M?? t???" styleCustomContainer={{ height: 80, paddingTop: 10, paddingBottom: 2 }}>
                <Field
                  component={Input}
                  name="description"
                  horizontal
                  placeholder="M?? t??? . . . . "
                  multiline={true}
                  numberOfLines={10}
                  customInputStyle={{ height: 68 }}
                  textAlign="left"
                  textAlignVertical="top"
                  maxLength={250}
                />
              </ContainerField>
              <ButtonCustom
                title={"Th??m m???i"}
                styleTitle={{ color: "#FFF" }}
                styleContain={{ backgroundColor: AppColor.BUTTON_MAIN, marginTop: 30, color: "#FFFF" }}
                onPress={() => { submitForm() }} />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

export default AddStorePoint;