import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import styles from './Profile.module.scss';
const cx = classNames.bind(styles);
const phoneRegExp =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
const Profile = () => {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      fullName: 'Phạm Hoàng Long',
      birth: '2000-12-17',
      email: 'phlonghcmus@gmail.com',
      phone: '0981335100',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address'),
      phone: Yup.string().matches(phoneRegExp, 'Invalid phone number'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className={cx('wrapper')}>
      <form onSubmit={formik.handleSubmit}>
        <h3>Profile</h3>
        <label htmlFor="fullName">Full name:</label>
        <input
          id="fullName"
          type="text"
          disabled={!onEdit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        <label htmlFor="birth">Day Of Birth:</label>
        <input
          id="birth"
          type="date"
          disabled={!onEdit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birth}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          disabled={!onEdit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={cx('error')}>{formik.errors.email}</div>
        ) : null}
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="text"
          disabled={!onEdit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className={cx('error')}>{formik.errors.phone}</div>
        ) : null}
        <div className={cx('action')}>
          {onEdit ? (
            <>
              <input type="submit" value="Update" />
              <input
                className={cx('action-cancel')}
                type="button"
                value="Cancel"
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
      </form>
    </div>
  );
};

export default Profile;
