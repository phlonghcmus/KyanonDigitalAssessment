import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Home.module.scss';
const cx = classNames.bind(styles);
const Home = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={cx('wrapper')}>
      <form>
        <h3>Login</h3>
        <label htmlFor="email">Email:</label>
        <input id="email" placeholder="example@kyanon.digital" type="text" />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="******"
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
