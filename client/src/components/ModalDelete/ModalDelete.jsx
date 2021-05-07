import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeDeleteModalAC } from '../../redux/actionCreaters/deleteModalAC';
import { deleteFileAC } from '../../redux/actionCreaters/fileAC';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  choiceButton: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default function ModaleDelete() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const dispatch = useDispatch();
  const deleteModal = useSelector((state) => state.deleteModal);

  const closeDeleteModalHandlerNO = () => {
    dispatch(closeDeleteModalAC());
  };

  const closeDeleteModalHandlerYES = async () => {
    const response = await fetch('http://localhost:4000/deleteFile', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: deleteModal.fileId }),
    });
    if (response.status === 200) {
      dispatch(deleteFileAC(deleteModal.fileId));
      dispatch(closeDeleteModalAC());
    }
  };

  return (
    <Modal
      open={deleteModal.open}
      onClose={closeDeleteModalHandlerNO}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Уверены, что хотите удалить?</h2>
        <div className={classes.choiceButton}>
          <Button onClick={closeDeleteModalHandlerYES} variant="contained">
            Да
          </Button>
          <Button onClick={closeDeleteModalHandlerNO} variant="contained">
            Нет
          </Button>
        </div>
      </div>
    </Modal>
  );
}
