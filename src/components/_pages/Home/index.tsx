import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  auth,
  getUserById,
  logInWithEmailAndPassword,
} from '../../../helpers/auth/firebase';
import { signIn } from '../../../redux/slices/user';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);
const Home = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [err, setErr] = useState<string>();
  const dispatch = useDispatch();
  return (
    <div className={cx('wrapper')}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let err = await logInWithEmailAndPassword(email, password);
          if (err) setErr('Username/Password invalid');
          else {
            let { fullName, birth, email, phoneNumber } = await getUserById(
              auth.currentUser?.uid
            );
            dispatch(signIn({ fullName, birth, email, phoneNumber }));
          }
        }}
      >
        <h3>Login</h3>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          placeholder="example@kyanon.digital"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span style={{ color: 'red' }}>{err}</span>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={cx('action')}>
          <div className={cx('show-password')}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <h5>Show password</h5>
          </div>
          <input type="submit" value="Sign In" />
        </div>
      </form>
    </div>
  );
};

export default Home;
