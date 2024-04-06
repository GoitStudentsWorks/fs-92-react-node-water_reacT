import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginOutThunk } from '../../redux/auth/authThunk';
import { isAuthSelector } from '../../redux/auth/selectors';
import { useSpring } from 'react-spring';
import {
  OverlayLogoutModal,
  ContainerLogoutModal,
  TitleContainer,
  TitleLogout,
  ButtonClose,
  IconWrapper,
  TextLogout,
  ButtonsContainer,
  ButtonLogout,
  ButtonCancel
} from './UserLogoutModal.styled';
import sprite from '../../assets/img/sprite.svg';

const UserLogoutModal = ({ onOpen, onClose }) => {
  const animation = useSpring({ 
    opacity: onOpen ? 1 : 0,
    config: { tension: 170, friction: 26 },
    from: { opacity: 0 }
  });

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const close = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', close);
    
    return () => {
      document.removeEventListener('keydown', close);
    };
  }, [onClose]);

  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(loginOutThunk());
    onClose();
    if (isAuth) {
      navigate('/welcome');
    }
  };
  
  return (
    <OverlayLogoutModal style={animation} onClick={handleBackdropClick}>
      <ContainerLogoutModal style={animation}>
        <TitleContainer>
          <TitleLogout>Log out</TitleLogout>

          <ButtonClose type='button' onClick={onClose}>
            <IconWrapper>
              <use xlinkHref={`${sprite}#icon-close`}></use>
            </IconWrapper>
          </ButtonClose>
        </TitleContainer>

        <TextLogout>Do you really want to leave?</TextLogout>

        <ButtonsContainer>
          <ButtonLogout type='button' onClick={handleLogout}>Log out</ButtonLogout>
          <ButtonCancel type='button' onClick={onClose}>Cancel</ButtonCancel>
        </ButtonsContainer>
      </ContainerLogoutModal>
    </OverlayLogoutModal>
  );
};

export default UserLogoutModal;
