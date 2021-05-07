import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeDeleteModalAC } from '../../redux/actionCreaters/deleteModalAC';
import { deleteFileAC, editFileAC } from '../../redux/actionCreaters/fileAC';
import {
  changeInputEditAC,
  closeEditModalAC,
} from '../../redux/actionCreaters/editModalAC';

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
  input: {
    minWidth: 270,
  },
  divInput: {
    marginBottom: 20,
  },
}));

export default function ModaleEdit() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const dispatch = useDispatch();
  const editModal = useSelector((state) => state.editModal);

  const closeEditModalHandlerNO = () => {
    dispatch(closeEditModalAC());
  };

  const closeEditModalHandlerYES = async () => {
    const response = await fetch('http://localhost:4000/editFile', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editModal.name, id: editModal.fileId }),
    });
    if (response.status === 200) {
      const serverResponse = await response.json();
      dispatch(editFileAC(serverResponse._id, serverResponse.name));
      dispatch(closeEditModalAC());
    }
  };

  return (
    <Modal
      open={editModal.open}
      onClose={closeEditModalHandlerNO}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Редактирование файла</h2>
        <div id="simple-modal-description" className={classes.divInput}>
          <TextField
            value={editModal.name}
            onChange={(e) => dispatch(changeInputEditAC(e.target.value))}
            className={classes.input}
            type="text"
            name="name"
          />
        </div>
        <div className={classes.choiceButton}>
          <Button onClick={closeEditModalHandlerYES} variant="contained">
            Сохранить
          </Button>
          <Button onClick={closeEditModalHandlerNO} variant="contained">
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  );
}
