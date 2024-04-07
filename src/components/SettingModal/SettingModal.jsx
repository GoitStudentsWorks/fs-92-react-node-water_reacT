import { useState, useEffect } from 'react';
import sprite from '../../assets/img/sprite.svg';
import {
  ButtonClose,
  IconWrapper,
  HeaderSettingModal,
  HeaderSettingName,
  ModalContent,
  ModalOverlay,
  Avatar,
  ContainerAvatar,
  ContainerPhoto,
  TitlePhoto,
  Upload,
  UploadWrapper,
  EyeButton,
  FieldWrapper,
  Form,
  FormContainer,
  FirstContainer,
  ContainerRME,
  FormText,
  GenderWrapper,
  RadiosWrapper,
  Input,
  LabelName,
  PasswordWrapper,
  RadioWrapper,
  StyledButton,
  StyledLabel,
  TextError,
} from './SettingModal.styled';

import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { currentThunk, updateAvatarThunk, changeUserDataThunk } from '../../redux/auth/authThunk';
import { profileSelector } from '../../redux/auth/selectors';

const SettingModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 500);
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      handleClose();
    }
  };

  useEffect(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (e.code === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('keydown', close);
    };
  }, [onClose]);

  const userProfile = useSelector(profileSelector);
  const userEmail = userProfile.email;
  const userName = userProfile.userName;
  const userAvatarUrl = userProfile.avatarURL;
  const userGender = userProfile.gender;
  const dispatch = useDispatch();

  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const UserSettingShema = yup.object().shape({
    gender: yup.string().required(),
    name: yup
      .string()
      .max(32, 'max length 32')
      .matches(
        /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/,
        'Name should only contain letters (Latin, Ukrainian or Cyrillic)'
      ),
    email: yup.string().matches(emailPattern, 'Email is not valid'),
    oldPassword: yup
      .string()
      .min(8, 'Password must be at least 6 characters')
      .max(64, 'Max length 64')
      .when('newPassword', (newPassword, field) =>
        newPassword[0] ? field.required() : field
      ),
    newPassword: yup
      .string()
      .min(8, 'Password must be at least 6 characters')
      .max(64, 'Max length 64')
      .nullable()
      .test(
        'differentPassword',
        'The new password must differ from the old one.',
        function (value) {
          const oldPassword = this.resolve(yup.ref('oldPassword'));
          return !oldPassword || value !== oldPassword;
        }
      ),
    repeatPassword: yup
      .string()
      .min(8, 'Password must be at least 6 characters')
      .max(64, 'Max length 64')
      .test('commonPassword', 'Passwords do not match.', function (value) {
        const newPassword = this.resolve(yup.ref('newPassword'));
        return !newPassword || String(value) === String(newPassword);
      }),
  });

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
  
    if (fileExtension !== 'jpg') {
      formik.setFieldError('photo', 'Only JPG files are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);
    dispatch(updateAvatarThunk(formData));
  };

  const formik = useFormik({
    initialValues: {
      name: userName,
      gender: userGender,
      email: userEmail,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: UserSettingShema,
    onSubmit: async (values) => {
      await dispatch(changeUserDataThunk({
        gender: values.gender,
        userName: values.name,
        email: values.email,
      }));
      await dispatch(currentThunk());
      await handleClose();
    },
  });

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleBackdropClick}>
      <ModalContent isOpen={isOpen}>
        <HeaderSettingModal>
          <HeaderSettingName>Setting</HeaderSettingName>

          <ButtonClose onClick={handleClose}>
            <IconWrapper>
              <use xlinkHref={`${sprite}#icon-close`} />
            </IconWrapper>
          </ButtonClose>
        </HeaderSettingModal>

        <ContainerPhoto>
          <TitlePhoto>Your photo</TitlePhoto>

          <UploadWrapper>
            <ContainerAvatar>
              {!userAvatarUrl && (
                <div>
                  {userName
                    ? userName.split('')[0].toUpperCase()
                    : 'V'}
                </div>
              )}
              {userAvatarUrl && (
                <Avatar src={userAvatarUrl} alt="AVATAR" weight="80px" />
              )}
            </ContainerAvatar>
            
            <Upload>
              <input
                name="photo"
                type="file"
                accept=".jpg"
                onChange={handleUpload}
                id="upload"
                style={{ display: 'none' }}
              />
              <svg>
                <use href={`${sprite}#icon-arrow-up-tray`} />
              </svg>
              <p>Upload a photo</p>
            </Upload>
            {formik.errors.photo && (
              <TextError>{formik.errors.photo}</TextError>
            )}
          </UploadWrapper>
        </ContainerPhoto>
        
        <Form onSubmit={formik.handleSubmit}>
          <FormContainer>
            <FirstContainer>
              <GenderWrapper>
                <StyledLabel>Your gender identity:</StyledLabel>

                <RadiosWrapper>
                  <RadioWrapper>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={formik.handleChange}
                        checked={formik.values.gender === 'female'}
                      />
                      <span>Woman</span>
                    </label>
                  </RadioWrapper>

                  <RadioWrapper>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={formik.handleChange}
                        checked={formik.values.gender === 'male'}
                      />
                      <span>Man</span>
                    </label>
                  </RadioWrapper>
                </RadiosWrapper>
              </GenderWrapper>
              
              <ContainerRME>
                <FieldWrapper>
                  <LabelName>Your name</LabelName>
                  <Input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    // onblur={formik.handleBlur}
                    placeholder="Name"
                    autoComplete="username"
                    error={formik.touched.name && formik.errors.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <TextError>{formik.errors.name}</TextError>
                  )}
                </FieldWrapper>
              
                <FieldWrapper>
                  <LabelName>Email</LabelName>
                  <Input
                    type="email"
                    name="email"
                    id="InputEmail1"
                    aria-describedby="emailHelp"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    // onblur={formik.handleBlur}
                    placeholder="Email"
                    autoComplete="email"
                    $error={formik.touched.email && formik.errors.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <TextError>{formik.errors.email}</TextError>
                  )}
                </FieldWrapper>
              </ContainerRME>
            </FirstContainer>
            <div>
              <StyledLabel>Password</StyledLabel>
              <FieldWrapper>
                <FormText>Outdate password:</FormText>
                <PasswordWrapper>
                  <EyeButton
                    onClick={() => setIsShowOldPassword(!isShowOldPassword)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    <svg>
                      <use
                        href={`${sprite}#${isShowOldPassword ? 'icon-eye' : 'icon-eye-slash'
                          }`}
                      />
                    </svg>
                  </EyeButton>
                  <Input
                    style={
                      formik.touched.oldPassword &&
                      formik.errors.oldPassword && { borderColor: '#EF5050 ' }
                    }
                    type={isShowOldPassword ? 'text' : 'password'}
                    id="oldPassword"
                    onChange={formik.handleChange}
                    value={formik.values.oldPassword}
                    // onBlur={formik.handleBlur}
                    placeholder="Old password"
                  />
                  {formik.touched.oldPassword && formik.errors.oldPassword && (
                    <TextError>{formik.errors.oldPassword}</TextError>
                  )}
                </PasswordWrapper>
              </FieldWrapper>
              <FieldWrapper>
                <FormText>New Password:</FormText>
                <div>
                  <PasswordWrapper>
                    <EyeButton
                      onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      <svg>
                        <use
                          href={`${sprite}#${isShowNewPassword ? 'icon-eye' : 'icon-eye-slash'
                            }`}
                        />
                      </svg>
                    </EyeButton>
                    <Input
                      style={
                        formik.touched.newPassword &&
                        formik.errors.newPassword && { borderColor: '#EF5050 ' }
                      }
                      type={isShowNewPassword ? 'text' : 'password'}
                      onChange={formik.handleChange}
                      value={formik.values.newPassword}
                      // onBlur={formik.handleBlur}
                      id="newPassword"
                      placeholder="New Password"
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                      <TextError>{formik.errors.newPassword}</TextError>
                    )}
                  </PasswordWrapper>
                </div>
              </FieldWrapper>
              <FieldWrapper>
                <FormText>Repeat new Password:</FormText>
                <div>
                  <PasswordWrapper>
                    <EyeButton
                      onClick={() =>
                        setIsShowConfirmPassword(!isShowConfirmPassword)
                      }
                      onMouseDown={handleMouseDownPassword}
                    >
                      <svg>
                        <use
                          href={`${sprite}#${isShowConfirmPassword ? 'icon-eye' : 'icon-eye-slash'
                            }`}
                        />
                      </svg>
                    </EyeButton>
                    <Input
                      style={
                        formik.touched.repeatPassword &&
                        formik.errors.repeatPassword && {
                          borderColor: '#EF5050 ',
                        }
                      }
                      type={isShowConfirmPassword ? 'text' : 'password'}
                      id="repeatPassword"
                      onChange={formik.handleChange}
                      value={formik.values.repeatPassword}
                      // onBlur={formik.handleBlur}
                      placeholder="Repeat new password"
                    />
                    {formik.touched.repeatPassword &&
                      formik.errors.repeatPassword && (
                        <TextError>{formik.errors.repeatPassword}</TextError>
                      )}
                  </PasswordWrapper>
                </div>
              </FieldWrapper>
            </div>
          </FormContainer>

          <StyledButton disabled={!formik.isValid} type="submit">
            Save
          </StyledButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingModal;