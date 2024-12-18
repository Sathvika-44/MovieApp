import styled from 'styled-components';
import {theme} from '../../common/colors.styles';

export const BookTicketButton = styled.button`
  background-color: red;
  padding: 15px;
  color: ${theme.fonts.primary}; /* Assuming you're using a theme */
  font-size: 20px;
  border-radius: 25px;
`;

export const BookingModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 400px;
`;

export const ModalContent = styled.div`
  text-align: center;
  h2{
    color:black;
  }
`;

export const DatePicker = styled.div`
  margin: 20px 0;

  label {
    display: block;
    margin-bottom: 8px;
  }
`;

export const SeatSelection = styled.div`
  margin: 20px 0;
`;

export const Seats = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Seat = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 20%;
  display: inline-block;
  margin: 5px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  background-color: #ccc;
  transition: background-color 0.3s;

  &.selected {
    background-color: #28a745;
    color: white;
  }

  &.booked {
    background-color: #ff4136;
    color: white;
    cursor: not-allowed;
  }
`;
