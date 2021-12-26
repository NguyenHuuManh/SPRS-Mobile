import { faCamera, faChevronLeft, faEdit, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRoute } from "@react-navigation/core";
import { Field, Formik } from "formik";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { createRef, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView, ScrollView, Text, TouchableOpacity, View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { apiGetStoreDetail, apiUpdateStore, apiUploadImg } from "../../ApiFunction/StorePoint";
import AppCamera from "../../Components/AppCamera";
import AppImageCrop from "../../Components/AppImageCrop";
import AppSelectStoreStatus from "../../Components/AppSelectStoreStatus";
import ButtonCustom from "../../Components/ButtonCustom";
import ContainerField from "../../Components/ContainerField";
import HeaderContainer from "../../Components/HeaderContainer";
import Input from "../../Components/Input";
import Loading from "../../Components/Loading";
import MapPicker from "../../Components/MapPicker";
import StoreCategory from "../../Components/StoreCategory";
import TimePicker from "../../Components/TimePicker";
import { IMAGE_URL } from "../../Constrants/url";
import { checkLatLng } from "../../Helper/FunctionCommon";
import { AppColor } from "../../Helper/propertyCSS";
import { height, width } from "../../Helper/responsive";
import { getCurrentRoute } from "../../Helper/RootNavigation";
import { MainStyle } from "../../Style/main_style";
// import styless from "./styless";
import { updateStore } from "./validate";


const UpdateStorePoint = ({ navigation }) => {
  const [items, setItems] = useState<any>([]);
  const item = useRoute<any>().params;
  const [data, setData] = useState<any>({});
  const [adressPoint, setAdressPoint] = useState<any>({});
  const [editEnable, setEditEnable] = useState(false);
  const formikRef = createRef<any>();
  const [imageModal, setImageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getStorePoint(item.id);
  }, [item])
  const getStorePoint = (id) => {
    if (isEmpty(id + "") || isUndefined(id) || isNull(id)) return;
    setLoading(true);
    apiGetStoreDetail(id).then((res) => {
      console.log("resStoreid", res);
      if (res.status == 200) {
        if (res.data.code == "200") {
          setAdressPoint({
            GPS_Lati: Number(res?.data.obj?.address?.GPS_lati),
            GPS_long: Number(res?.data.obj?.address?.GPS_long),
            city: res?.data.obj?.address.city.name,
            district: res?.data.obj?.address.district.name,
            subDistrict: res?.data.obj?.address.subDistrict.name,
          })
          setData(res.data.obj);
          setItems(res.data.obj.store_category);
        } else {
          Toast.show({
            type: "error",
            text1: res.data.message,
            position: "top"
          })
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Chức năng đang bảo trì",
          position: "top"
        })
      }
    }).finally(() => { setLoading(false) })
  }

  const UpdateStore = (body) => {
    setLoading(true);
    apiUpdateStore(body).then((res) => {
      console.log("ressss", res)
      if (res.status == 200) {
        if (res.data.code == "200") {
          Toast.show({
            type: "success",
            text1: "Cập nhật cửa hàng thành công",
            position: "top"
          })
          setEditEnable(false);
          navigation.goBack();
        } else {
          Toast.show({
            type: "success",
            text1: "Cập nhật cửa hàng thành công",
            position: "top"
          })
        }
      } else {
        Toast.show({
          type: "error",
          text1: res.data.message,
          position: "top"
        })
      }
    }).finally(() => { setLoading(false) })
  }
  const updateImg = (image) => {
    if (isEmpty(image)) {
      Toast.show({
        type: "error",
        text1: 'Bạn chưa chọn ảnh nào',
        position: "top"
      })
      return;
    }
    const arr = image.path.split('/');
    const name = arr[arr.length - 1];
    const bodyImage = {
      imageName: name,
      encodedImage: image.data,
      id: data.id
    }
    apiUploadImg(bodyImage).then((response) => {
      getStorePoint(data.id);
      // console.log("reponseImg", response);
    }).finally(() => { })
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Loading isVisible={loading} />
      <View style={{ height: height * 0.07 }}>
        <HeaderContainer
          flexRight={2}
          flexLeft={1}
          flexCenter={10}
          isBack
          centerEl={(
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#FFF" }}>{editEnable ? "Cập nhật cửa hàng" : "Thông tin cửa hàng"}</Text>
            </View>
          )}
          rightEL={
            editEnable ?
              <TouchableOpacity onPress={() => {
                setEditEnable(false);
                formikRef.current.resetForm();
                setItems(data.store_category);
                setAdressPoint({
                  GPS_Lati: Number(data?.address?.GPS_lati),
                  GPS_long: Number(data?.address?.GPS_long),
                  city: data?.address?.city?.name,
                  district: data?.address?.district?.name,
                  subDistrict: data?.address?.subDistrict?.name,
                })
              }}
                style={{ alignItems: 'center' }}
              >
                <Text style={{ color: "#FFFF" }}>Hủy</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => { setEditEnable(true) }}>
                <FontAwesomeIcon icon={faEdit} color="#FFFF" />
              </TouchableOpacity>
          }
        />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          // height: height + (height * 0.1),
          width: width,
          justifyContent: "flex-start",
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: "#FFFF",
          paddingBottom: 10
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: '100%', height: 250, alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
            <TouchableOpacity style={[{
              position: "absolute",
              bottom: 22,
              right: 5,
              zIndex: 100,
              backgroundColor: '#A0A6BE',
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center'
            }, MainStyle.boxShadow]} onPress={() => { setImageModal(true) }}>
              <FontAwesomeIcon icon={faCamera} />
            </TouchableOpacity>
            {data?.images?.img_url ? (
              <Image
                source={{ uri: `${IMAGE_URL}${data?.images?.img_url}` }}
                style={{ width: '100%', height: '100%' }}
                loadingIndicatorSource={require('../../')}
                resizeMethod="resize"
                resizeMode="center"
              />
            ) : (
              <Image
                source={require('../../Assets/Images/storeDefault.png')}
                style={{ width: height * 0.25, height: height * 0.25 }}
                resizeMethod="scale"
                resizeMode="cover"
              />
            )}
            <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>{data?.full_name}</Text>
          </View>
          <AppImageCrop visible={imageModal} setVisible={setImageModal} onSave={updateImg} cropperCircleOverlay={false} imageDefault={require('../../Assets/Images/storeDefault.png')} />
        </View>
        <Formik
          initialValues={{
            id: data?.id,
            open_time: data?.open_time || "",
            close_time: data?.close_time || "",
            // status: data?.status,
            name: data?.name || "",
            description: data?.description || "",
          }}
          innerRef={formikRef}
          validationSchema={updateStore}
          enableReinitialize
          onSubmit={(values) => {
            if (isEmpty(items)) {
              Toast.show({
                type: "error",
                text1: 'Chọn ít nhật một loại sản phẩm',
                position: "top"
              });
              return;
            }

            if (!checkLatLng(adressPoint.GPS_Lati, adressPoint.GPS_long)) {
              Toast.show({
                type: "error",
                text1: 'Bạn chưa chọn địa điểm, hoặc địa điểm chưa hợp lệ',
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
                id: data.address.id,
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

            UpdateStore(body);
          }}
        >
          {({ submitForm, errors, values }) => (
            <View>
              <ContainerField title="Tên cửa hàng">
                <Field
                  component={Input}
                  name="name"
                  horizontal
                  placeholder="Tên cửa hàng"
                  styleTitle={{ width: 110 }}
                  editable={editEnable}
                  maxLength={100}
                />
              </ContainerField>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <ContainerField title="Giờ mở cửa">
                    <Field
                      component={TimePicker}
                      name="open_time"
                      // title="Thời gian hoạt động"
                      mode="time"
                      horizontal
                      placeholder="Mở cửa"
                      styleTitle={{ width: 110 }}
                      disabled={!editEnable}
                    />
                  </ContainerField>
                </View>
                <View style={{ width: "50%", paddingLeft: 5 }}>
                  <ContainerField title="Giờ đóng cửa">
                    <Field
                      component={TimePicker}
                      name="close_time"
                      // title="Thời gian kết thúc"
                      mode="time"
                      horizontal
                      placeholder="Đóng cửa"
                      styleTitle={{ width: 110 }}
                      disabled={!editEnable}
                    />
                  </ContainerField>
                </View>
              </View>
              {(!isEmpty(adressPoint) || true) && (
                <ContainerField title="Địa điểm">
                  <MapPicker
                    styleTitle={{ width: 110 }}
                    horizontal
                    iconRight={faMapMarkedAlt}
                    iconSize={20}
                    setAdress={setAdressPoint}
                    adress={adressPoint}
                    defaultAdress={adressPoint}
                    disabled={!editEnable}
                  />
                </ContainerField>
              )}


              <ContainerField title="Mặt hàng">
                <StoreCategory items={items} setItems={setItems} readonly={!editEnable} />
                {/* {isEmpty(items) && editEnable && (
                  <Text style={[MainStyle.texError,]}>chọn mặt hàng cung cấp</Text>
                )} */}
              </ContainerField>
              <ContainerField title="Mô tả" styleCustomContainer={{ height: 80, paddingTop: 10, paddingBottom: 2 }}>
                <Field
                  component={Input}
                  name="description"
                  horizontal
                  placeholder="Mô tả . . . . "
                  multiline={true}
                  numberOfLines={10}
                  customInputStyle={{ height: 68 }}
                  textAlign="left"
                  textAlignVertical="top"
                  maxLength={250}
                  editable={editEnable}
                />
              </ContainerField>
              {editEnable && (
                <ButtonCustom title={"Cập nhật"} styleContain={{ backgroundColor: AppColor.BUTTON_MAIN, marginTop: 30, }} onPress={() => { submitForm() }} />
              )}
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

export default UpdateStorePoint;