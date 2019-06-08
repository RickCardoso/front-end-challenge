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
