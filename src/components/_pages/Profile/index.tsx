import classNames from 'classnames/bind';
import { Formik, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Profile.module.scss';
import { auth, logout, updateUserById } from '../../../helpers/auth/firebase';
import { selectUser } from '../../../redux/slices/user';
import { signOut, updateUser } from '../../../redux/slices/user';
import { UserInfo } from '../../../share/types';

const cx = classNames.bind(styles);
const phoneRegExp =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
const Profile = () => {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const user: UserInfo = useSelector(selectUser);
  const dispatch = useDispatch();
  const validateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Invalid phone number'),
    birth: Yup.date().max(new Date(), "You can't born in furture"),
  });
  return (
    <div className={cx('wrapper')}>
      <Formik
        initialValues={{
          fullName: `${user.fullName || ''}`,
          birth: `${user.birth || ''}`,
          email: `${user.email || ''}`,
          phoneNumber: `${user.phoneNumber || ''}`,
        }}
        enableReinitialize={true}
        validationSchema={validateSchema}
        onSubmit={async (values) => {
          await updateUserById(auth.currentUser?.uid, {
            birth: values.birth,
            email: values.email,
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
          })
            .then(() => {
              setOnEdit(false);
              dispatch(
                updateUser({
                  birth: values.birth,
                  email: values.email,
                  fullName: values.fullName,
                  phoneNumber: values.phoneNumber,
                })
              );
            })
            .catch(() => {
              alert('Update failed');
            });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <h3>Profile</h3>
            <label htmlFor="fullName">Full name:</label>
            <input
              id="fullName"
              type="text"
              disabled={!onEdit}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.fullName}
            />
            <label htmlFor="birth">Day Of Birth:</label>
            <input
              id="birth"
              type="date"
              disabled={!onEdit}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.birth}
            />
            {props.touched.birth && props.errors.birth ? (
              <div className={cx('error')}>{props.errors.birth}</div>
            ) : null}
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              disabled={!onEdit}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
            />
            {props.touched.email && props.errors.email ? (
              <div className={cx('error')}>{props.errors.email}</div>
            ) : null}
            <label htmlFor="phone">Phone:</label>
            <input
              id="phoneNumber"
              type="text"
              disabled={!onEdit}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.phoneNumber}
            />
            {props.touched.phoneNumber && props.errors.phoneNumber ? (
              <div className={cx('error')}>{props.errors.phoneNumber}</div>
            ) : null}
            <div className={cx('action')}>
              <div>
                <input
                  className={cx('action-logout')}
                  type="button"
                  value="Logout"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    dispatch(signOut());
                  }}
                />
              </div>
              <div>
                {onEdit ? (
                  <>
                    <input type="submit" value="Update" />
                    <input
                      className={cx('action-cancel')}
                      type="button"
                      value="Cancel"
                      onClick={(e) => {
                        e.preventDefault();
                        setOnEdit(false);
                      }}
                    />
                  </>
                ) : (
                  <input
                    type="button"
                    value="Edit"
                    onClick={(e) => {
                      e.preventDefault();
                      setOnEdit(true);
                    }}
                  />
                )}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
