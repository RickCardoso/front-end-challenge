import ClientStatus from '@/core/models/ClientStatus';
import DocumentType from '@/core/models/DocumentType';

export const CLIENT_STATUS_LIST: ClientStatus[] = [
  {
    id: 1,
    description: 'Aprovado',
    color: 'green',
  },
  {
    id: 2,
    description: 'Bloqueado',
    color: 'yellow',
  },
  {
    id: 3,
    description: 'Cancelado',
    color: 'red',
  },
  {
    id: 4,
    description: 'Descredenciado',
    color: 'gray',
  },
];

export const DOCUMENT_TYPE_LIST: DocumentType[] = [
  {
    id: 1,
    description: 'Pessoa jurídica',
  },
  {
    id: 2,
    description: 'Pessoa física',
  },
];

export const TRANSACTION_STATUS_LIST = [
  {
    id: 1,
    description: 'Autorizado',
    color: 'green',
    icon: 'check_circle_outline',
  },
  {
    id: 2,
    description: 'Cancelado',
    color: 'gray',
    icon: 'close',
  },
  {
    id: 3,
    description: 'Negado',
    color: 'red',
    icon: 'block',
  },
];

export const BRAND_LIST = [
  {
    id: 1,
    name: 'Mastercard',
  },
  {
    id: 2,
    name: 'VISA',
  },
  {
    id: 3,
    name: 'Elo',
  },
  {
    id: 4,
    name: 'American Express',
  },
];
