import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faLock,
  faDumbbell,
  faPlus,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

export const addIcons = () => {
  library.add(faEnvelope, faLock, faDumbbell, faPlus, faEdit);
};
