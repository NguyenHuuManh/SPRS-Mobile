import { faCamera, faChevronLeft, faEdit, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRoute } from "@react-navigation/core";
import { Field, Formik } from "formik";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { createRef, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { apiGetEventDetail, apiUpdateEventPoint } from "../../ApiFunction/EventPoint";
import { apiUploadImg } from "../../ApiFunction/ReliefPoint";
import AppImageCrop from "../../Components/AppImageCrop";
import ButtonCustom from "../../Components/ButtonCustom";
import ContainerField from "../../Components/ContainerField";
import DateTimePicker from "../../Components/DateTimePicker";
import HeaderContainer from "../../Components/HeaderContainer";
import Input from "../../Components/Input";
import MapPicker from "../../Components/MapPicker";
import MultipleAddItem from "../../Components/MultipleAddItem";
import TimePicker from "../../Components/TimePicker";
import { IMAGE_URL } from "../../Constrants/url";
import { AppColor } from "../../Helper/propertyCSS";
import { height } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import styles from "../AddLocation/styles";
import ImageView from "./components/ImageView";

const UpdateReliefPoint = ({ navigation }) => {
  const [items, setItems] = useState<any>([]);
  const [data, setData] = useState<any>({});
  const [editEnable, setEditEnable] = useState(false);
  const formikRef = createRef<any>();
  const [loadingImg, setLoadingImg] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const item = useRoute<any>().params;
  const [adressPoint, setAdressPoint] = useState<any>({
    GPS_Lati: item?.address?.GPS_lati || '',
    GPS_long: item?.address?.GPS_long || '',
    city: "",
    district: "",
    subDistrict: "",
  })

  const callUpdateReliefPoint = (body) => {
    apiUpdateEventPoint(body).then((res) => {
      console.log(res, 'resUpdateRelief')
      if (res.status == 200) {
        if (res.data.code == "200") {
          Toast.show({
            type: "success",
            text1: "Cập nhật thành công",
            position: "top"
          });
          if (item?.from == 'MapCluser') return;
          navigation.goBack();
          return;
        }
        Toast.show({
          type: "error",
          text1: res.data.message,
          position: "top"
        })
      } else {
        Toast.show({
          type: "error",
          text1: "Chức năng đang bảo trì",
          position: "top"
        })
      }
    })
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

    setLoadingImg(true);
    apiUploadImg(bodyImage).then((response) => {
      console.log("reponseImg", response);
      callGetReliefPointDetail();
    }).finally(() => { setLoadingImg(false) })
  }
  const callGetReliefPointDetail = () => {
    apiGetEventDetail({ id: item.id }).then((res) => {
      console.log('res', res)
      if (res.status == 200) {
        if (res.data.code == "200") {
          setData(res.data.obj);
          setAdressPoint({
            GPS_Lati: res.data.obj.address.GPS_lati,
            GPS_long: res.data.obj.address.GPS_long,
            city: res.data.obj.address.city.name || "",
            district: res.data.obj.address.district.name || "",
            subDistrict: res.data.obj.address.subDistrict.name || "",
          })
          setItems(res.data.obj.reliefInformations);
          return;
        }
      } else {
        Toast.show({
          type: "error",
          text1: res.data.message,
          position: "top"
        })
      }
    })
  }
  useEffect(() => {
    callGetReliefPointDetail();
  }, [item])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ height: height * 0.07 }}>
        <HeaderContainer
          flexRight={1}
          flexCenter={10}
          flexLeft={1}
          isBack
          centerEl={(
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#FFF" }}>{editEnable ? "Cập nhật điểm cứu trợ" : "Thông tin điểm cứu trợ"}</Text>
            </View>
          )}
          rightEL={
            editEnable ?
              <TouchableOpacity onPress={() => {
                setEditEnable(false);
                formikRef.current.resetForm();
                setItems(data.reliefInformations);
                setAdressPoint({
                  GPS_Lati: Number(data?.address?.GPS_lati),
                  GPS_long: Number(data?.address?.GPS_long),
                  city: data?.address?.city?.name,
                  district: data?.address?.district?.name,
                  subDistrict: data?.address?.subDistrict?.name,
                })
              }}>
                <Text style={{ color: "#FFFF" }}>Hủy</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { setEditEnable(true) }}>
                <FontAwesomeIcon icon={faEdit} color="#FFFF" />
              </TouchableOpacity>
          }
        />
      </View>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: '100%', height: 250, alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
            {data?.images?.img_url ? (
              <TouchableOpacity
                onPress={() => { setViewModal(true) }}
                style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
              >
                <Image
                  source={{ uri: `${IMAGE_URL}${data?.images?.img_url}` }}
                  style={{ width: '100%', height: '100%' }}
                  loadingIndicatorSource={require('../../')}
                  resizeMethod="resize"
                  resizeMode="center"
                />
              </TouchableOpacity>
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
          <ImageView img_url={data?.images?.img_url} visible={viewModal} setVisible={setViewModal} />
        </View>
        <Formik
          initialValues={{
            id: data?.id,
            open_Hour_time: (!isNull(data?.open_time) && !isUndefined(data?.open_time)) ? data?.open_time.split(" ")[1] : "",
            close_Hour_time: (!isNull(data?.close_time) && !isUndefined(data?.close_time)) ? data?.close_time.split(" ")[1] : "",
            open_Date_time: (!isNull(data?.open_time) && !isUndefined(data?.open_time)) ? data?.open_time.split(" ")[0] : "",
            close_Date_time: (!isNull(data?.close_time) && !isUndefined(data?.close_time)) ? data?.close_time.split(" ")[0] : "",
            // status: data?.status || "",
            name: data?.name || "",
            description: data?.description || "",
          }}
          innerRef={formikRef}
          enableReinitialize
          onSubmit={(values) => {
            if (isEmpty(items)) {
              Toast.show({
                type: "error",
                text1: 'Chọn ít nhất một mặt hàng',
                position: "top"
              });
              return;
            }
            const body = {
              ...values,
              open_time: values.open_Date_time + " " + values.open_Hour_time,
              close_time: values.close_Date_time + " " + values.close_Hour_time,
              reliefInformations: items.map((e) => {
                return {
                  id: e.id,
                  quantity: e.quantity,
                  item: {
                    id: e.item.id
                  }
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
            delete body.close_Date_time;
            delete body.close_Hour_time;
            delete body.open_Date_time;
            delete body.open_Hour_time;
            // console.log("body", body);
            callUpdateReliefPoint(body);
          }}
        >
          {({ submitForm }) => (
            <View>

              <ContainerField title="Tên điểm cứu trợ">
                <Field
                  component={Input}
                  name="name"
                  horizontal
                  placeholder="Tên điểm cứu trợ"
                  styleTitle={{ width: 110 }}
                  editable={false}
                />
              </ContainerField>

              <ContainerField title="Thời gian hoạt động">
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 3 }}>
                    <Field
                      component={DateTimePicker}
                      name="open_Date_time"
                      horizontal
                      placeholder="Mở cửa"
                      styleTitle={{ width: 110 }}
                      disabled={true}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Field
                      component={TimePicker}
                      name="open_Hour_time"
                      horizontal
                      placeholder="Mở cửa"
                      styleTitle={{ width: 110 }}
                      disabled={true}
                    />
                  </View>
                </View>
              </ContainerField>
              <ContainerField title="Thời gian kết thúc">
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 3 }}>
                    <Field
                      component={DateTimePicker}
                      name="close_Date_time"
                      horizontal
                      placeholder="Đóng cửa"
                      styleTitle={{ width: 110 }}
                      disabled={true}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Field
                      component={TimePicker}
                      name="close_Hour_time"
                      horizontal
                      placeholder="Mở cửa"
                      styleTitle={{ width: 110 }}
                      disabled={true}
                    />
                  </View>
                </View>
              </ContainerField>
              <ContainerField title="Địa điểm">
                <MapPicker
                  styleTitle={{ width: 110 }}
                  horizontal
                  iconRight={faMapMarkedAlt}
                  iconSize={20}
                  setAdress={setAdressPoint}
                  adress={adressPoint}
                  defaultAdress={adressPoint}
                  disabled={true}
                />
              </ContainerField>
              <ContainerField title="Mặt hàng">
                <MultipleAddItem items={items} setItems={setItems} readOnly={!editEnable} />
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
    </ScrollView >
  );
}

export default UpdateReliefPoint;