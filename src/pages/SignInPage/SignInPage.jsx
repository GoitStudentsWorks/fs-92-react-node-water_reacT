import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  SignInGlobalContainer,
  SignInContainer,
  SignInTitle,
  SignInLabel,
  SignInInput,
  SignInButton,
  SignInwater,
  TogglePasswordButton,
  ErrorMessage,
  Form,
  DesktopBg,
  FirstWaterBulb,
  SecondWaterBulb,
  ThirdWaterBulb,
  FourthWaterBulb,
  FifthWaterBulb,
  StyledLink,
  TextLink,
} from './SignInPage.styled';
import sprite from '../../assets/img/sprite.svg';
import { loginThunk, currentThunk } from '../../redux/auth/authThunk';
import { Section } from '../../components/Section/Section';

const SignInComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.email || !values.email.includes('@')) {
        errors.email = t('Email is invalid');
      }

      if (!values.password || values.password.length < 6) {
        errors.password = t('Password is invalid');
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        if (!values.password) {
          setLoginError('Password is required');
          return;
        }

        await dispatch(
          loginThunk({ email: values.email, password: values.password })
        );
        await dispatch(currentThunk());
      } catch (error) {
        setLoginError('Invalid email or password. Please try again.');
      }
    },
  });

  return (
    <DesktopBg>
      <Section>
        <SignInGlobalContainer>
          <SignInwater></SignInwater>
          <SignInContainer>
            <SignInTitle>{t(`Sign In`)}</SignInTitle>
            <FirstWaterBulb />
            <SecondWaterBulb />
            <ThirdWaterBulb />
            <FourthWaterBulb />
            <FifthWaterBulb />
            <Form onSubmit={formik.handleSubmit}>
              <SignInLabel>{t(`Enter your email`)}</SignInLabel>
              <SignInInput
                type="email"
                name="email"
                placeholder="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
                error={formik.touched.email && formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <ErrorMessage>{formik.errors.email}</ErrorMessage>
              )}
              <SignInLabel>{t(`Enter your password`)}</SignInLabel>
              <div style={{ position: 'relative' }}>
                <SignInInput
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={t('Password')}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && formik.errors.password}
                />
                <TogglePasswordButton
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <svg>
                    <use
                      href={`${sprite}#${showPassword ? 'eye' : 'eye-slash'}`}
                    />
                  </svg>
                </TogglePasswordButton>
              </div>
              {formik.touched.password && formik.errors.password && (
                <ErrorMessage>{formik.errors.password}</ErrorMessage>
              )}
              {loginError && <ErrorMessage>(loginError)</ErrorMessage>}{' '}
              <SignInButton type="submit" disabled={!formik.isValid}>
                {t(`Sign In`)}
              </SignInButton>
            </Form>
            <StyledLink to="/signup">
              <TextLink>{t(`Sign Up`)}</TextLink>
            </StyledLink>
          </SignInContainer>
        </SignInGlobalContainer>
      </Section>
    </DesktopBg>
  );
};

export default SignInComponent;
