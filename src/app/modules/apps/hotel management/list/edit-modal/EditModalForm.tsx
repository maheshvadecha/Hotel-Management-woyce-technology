import { FC, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isNotEmpty } from '../../../../../../_metronic/helpers'
import { HotelDataModel, initial, } from '../core/_models'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { ListLoading } from '../components/loading/ListLoading'
import { createHotelData, getAllState, getRoomType, updateHotelData, } from '../core/_requests'
import { useQueryResponse } from '../core/QueryResponseProvider'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'
import Multiselect from 'multiselect-react-dropdown';

export const saveHotelToast = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: 'Hotel registered successfully',
  })
}

export const updateHotelToast = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: 'Hotel update successfully',
  })
}

type Props = {
  isUserLoading: boolean
  user: HotelDataModel
}

const editHotelSchema = Yup.object().shape({
  state_id: Yup.number()
    .required('State Name is required'),

  hotel_name: Yup.string()
    .required('Hotel Name is required'),

  price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  pickup_price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  drop_price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  adult_with_mattress: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  child_with_mattress: Yup.number()
    .integer("This field shouisUserLoadingld contain an integer")
    .required().typeError("The field must contain a number"),

  star: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),
})

const EditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const { setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()

  const [userForEdit] = useState<HotelDataModel>({
    ...user,
    state_id: user.state_id,
    hotel_name: user.hotel_name,
    hotel_image: user.hotel_image,
    roomtype: user.roomtype,
    meal: user.meal || initial.meal,
    price: user.price,
    pickup_price: user.pickup_price || initial.pickup_price,
    drop_price: user.drop_price || initial.drop_price,
    adult_with_mattress: user.adult_with_mattress || initial.adult_with_mattress,
    child_with_mattress: user.child_with_mattress || initial.child_with_mattress,
    star: user.star || initial.star,
    status: user.status || initial.status,
  })

  const [status, setStatus] = useState(user.status ? true : false || initial.status ? false : true);
  const [hotelImage, setHotelImage] = useState('');
  const [roomType, setroomType] = useState<number[]>(user.roomtype);
  const [preview, setPreview] = useState(user.hotel_image);
  const selectedValue: any = []
  const [mealPlan, setMealPlan] = useState<any>(user.meal)

  //Meal plan start
  const handleChange = (e: any, index: number) => {
    let newMealPlan = [...mealPlan];
    newMealPlan[index][e.target.name] = e.target.value
    setMealPlan(newMealPlan);
  }
  const AddPlan = () => {
    setMealPlan([...mealPlan, { name: '', price: 0 }])
  }
  const RemovePlan = (index: number) => {
    let newMealPlan = [...mealPlan];
    newMealPlan.splice(index, 1);
    setMealPlan(newMealPlan);
  }
  //Meal plan end


  //Room type start
  const onSelect = (_selectedList: any, selectedItem: any) => {
    setroomType([...roomType, selectedItem.id])
  }
  const onRemove = (_selectedList: any, removedItem: any) => {
    roomType.splice(roomType.indexOf(removedItem.id), 1)
  }
  //Room type end

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  console.log(userForEdit)
  console.log(mealPlan)
  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editHotelSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (roomType.length == 0) {
        alert('Please select a room type')
        return
      }

      values.status = status ? 1 : 0
      values.roomtype = roomType
      values.meal = mealPlan
      let formData = new FormData();
      formData.append('data', JSON.stringify(values))
      formData.append('hotel_image', hotelImage);
      setSubmitting(true)

      try {
        if (isNotEmpty(values.id)) {
          await updateHotelData(formData)
        } else {
          await createHotelData(formData)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })
  const {
    data: stateList,
  } = useQuery(
    'getAllState',
    () => {
      return getAllState()
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const {
    data: roomTypes
  } = useQuery(
    'getRoomType',
    () => {
      return getRoomType()
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  )

  if (roomTypes && roomTypes.length > 0 && roomType && roomType.length > 0) {
    roomTypes.forEach((item: any) => {
      roomType.forEach((id) => {
        if (item.id == id) {
          selectedValue.push(item)
        }
      })
    })
  }

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>State</label>
            <select
              defaultValue={''}
              data-control='select2'
              {...formik.getFieldProps('state_id')}
              className={clsx(
                'form-select form-select-white form-select-sm',
                { 'is-invalid': formik.touched.state_id && formik.errors.state_id },
                {
                  'is-valid': formik.touched.state_id && !formik.errors.state_id,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            >
              <option>select state</option>
              {stateList && stateList.map((value: any, i: number) =>
                <option key={i} value={value.id}>{value.state}</option>
              )}
            </select>
            {formik.touched.state_id && formik.errors.state_id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.state_id}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Hotel Name</label>
            <input
              placeholder='Hotel Name'
              {...formik.getFieldProps('hotel_name')}
              type='text'
              name='hotel_name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.hotel_name && formik.errors.hotel_name },
                {
                  'is-valid': formik.touched.hotel_name && !formik.errors.hotel_name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.hotel_name && formik.errors.hotel_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.hotel_name}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>Hotel Image</label>
            <div>
              <input
                type='file'
                id='file'
                name='hotel_image'
                accept='image/*'
                onChange={
                  (e: any) => {
                    console.log(e.target)
                    let file = e.target.files[0];
                    let reader: any = new FileReader()
                    let url = reader.readAsDataURL(file)
                    reader.onloadend = (e: any) => {
                      setPreview(reader.result)
                    }
                    setHotelImage(e.target.files[0]);
                  }}
              />
              {
                preview && preview.length > 0 ?
                  < img src={preview} width={150} height={150} className='mx-7' /> : null
              }
            </div>
          </div>

          <div className='fv-row mb-7' >
            <label htmlFor="" className='required fw-bold fs-6 mb-2'>Hotel Room Type</label>
            <Multiselect
              options={roomTypes}
              placeholder={'Select a room type'}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="roomtype"
              showCheckbox={true}
              showArrow={true}
              selectedValues={selectedValue}
            />
            {roomType.length == 0 && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>Please select a room type</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Price</label>
            <input
              placeholder='Price'
              {...formik.getFieldProps('price')}
              type='number'
              name='price'
              accept='number/*'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.price && formik.errors.price },
                {
                  'is-valid': formik.touched.price && !formik.errors.price,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.price && formik.errors.price && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.price}</span>
                </div>
              </div>
            )}
          </div>

          <label className='fw-bold fs-6 mb-2'>Meal Plane</label>
          <div className="row row-cols-lg-auto g-3 mt-2">
            {
              mealPlan && mealPlan.length >= 0 ? (
                mealPlan.map((item: any, index: number) => {
                  return (
                    <div className='row mb-3'>
                      <div className='col-7 md-2 '>
                        <label htmlFor='name' className="visually-hidden">Name</label>
                        <input
                          className='form-control'
                          type="text"
                          placeholder='Enter name'
                          value={item.name}
                          name='name'
                          id='name'
                          required
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      <div className='col-3 md-2'>
                        <label htmlFor='price' className="visually-hidden">Price</label>
                        <input
                          className='form-control'
                          type='number'
                          placeholder='price'
                          value={item.price}
                          name='price'
                          id='price'
                          required
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      {
                        index ?
                          <div className='col-2'>
                            <button
                              className="btn btn-primary btn-block"
                              type='button'
                              onClick={() => RemovePlan(index)} > X
                            </button>
                          </div> : <div className='col'><button className="btn btn-primary btn-block" type='button' onClick={AddPlan}>+</button></div>
                      }
                    </div>
                  )
                })
              ) : null
            }
          </div>

          <div className='fv-row mb-7'>
            <label className=' fw-bold fs-6 mb-2'>Pickup Price</label>
            <input
              placeholder='Pickup Price'
              {...formik.getFieldProps('pickup_price')}
              type='number'
              name='pickup_price'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.pickup_price && formik.errors.pickup_price },
                {
                  'is-valid': formik.touched.pickup_price && !formik.errors.pickup_price,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.pickup_price && formik.errors.pickup_price && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.pickup_price}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className=' fw-bold fs-6 mb-2'>Drop Price</label>
            <input
              placeholder='Drop Price'
              {...formik.getFieldProps('drop_price')}
              type='number'
              name='drop_price'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.drop_price && formik.errors.drop_price },
                {
                  'is-valid': formik.touched.drop_price && !formik.errors.drop_price,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.drop_price && formik.errors.drop_price && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.drop_price}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className=' fw-bold fs-6 mb-2'>Extra Adult With Mattress</label>
            <input
              placeholder='Extra Adult With Mattress'
              {...formik.getFieldProps('adult_with_mattress')}
              type='number'
              name='adult_with_mattress'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.adult_with_mattress && formik.errors.adult_with_mattress },
                {
                  'is-valid': formik.touched.adult_with_mattress && !formik.errors.adult_with_mattress,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.adult_with_mattress && formik.errors.adult_with_mattress && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.adult_with_mattress}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className=' fw-bold fs-6 mb-2'>Extra Child Without Mattress</label>
            <input
              placeholder='Extra Child Without Mattress'
              {...formik.getFieldProps('child_with_mattress')}
              type='number'
              name='child_with_mattress'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.child_with_mattress && formik.errors.child_with_mattress },
                {
                  'is-valid': formik.touched.child_with_mattress && !formik.errors.child_with_mattress,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.child_with_mattress && formik.errors.child_with_mattress && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.child_with_mattress}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className=' fw-bold fs-6 mb-2'>Star</label>
            <select
              defaultValue=''
              data-control='select2'
              data-hide-search='true'
              {...formik.getFieldProps('star')}
              className={clsx(
                'form-select form-select-white form-select-sm',
                { 'is-invalid': formik.touched.star && formik.errors.star },
                {
                  'is-valid': formik.touched.star && !formik.errors.star,
                }
              )}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 </option>
              <option value="4">4 </option>
              <option value="5">5 </option>
              <option value="6">6 </option>
              <option value="7">7 </option>
            </select>
          </div>

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className=' fw-bold fs-6 mb-2'>Status</label>
            {/* end::Label */}

            {/* begin::Input */}
            <div className='form-check form-switch form-check-custom form-check-solid'>
              <input
                className='form-check-input'
                type='checkbox'
                onChange={() => {
                  setStatus(!status)
                }}
                checked={status}
                id='flexSwitchDefault'
              />
            </div>

            {/* end::Input */}
          </div>
          {/* end::Input group */}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched || roomType.length == 0}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <ListLoading />}
    </>
  )
}

export { EditModalForm }