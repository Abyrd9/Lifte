import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faLock,
  faDumbbell,
  faPlus,
  faPlusCircle,
  faMinus,
  faEdit,
  faSave,
  faEllipsisV,
  faCaretDown,
  faTimes,
  faTimesCircle,
  faUser,
  faMinusCircle,
  faArrowLeft,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

export const addIcons = () => {
  library.add(
    faEnvelope,
    faLock,
    faDumbbell,
    faPlus,
    faPlusCircle,
    faMinus,
    faMinusCircle,
    faEdit,
    faSave,
    faEllipsisV,
    faCaretDown,
    faTimes,
    faTimesCircle,
    faUser,
    faArrowLeft,
    faCheckCircle
  );
};
