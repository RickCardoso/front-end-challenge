import ClientStatus from '@/core/models/ClientStatus';
import DocumentType from '@/core/models/DocumentType';

export const CLIENT_STATUS_LIST: ClientStatus[] = [
  {
    id: 1,
    description: 'Aprovado',
  },
  {
    id: 2,
    description: 'Bloqueado',
  },
  {
    id: 3,
    description: 'Cancelado',
  },
  {
    id: 4,
    description: 'Descredenciado',
  },
];

export const DOCUMENT_TYPE_LIST: DocumentType[] = [
  {
    id: 1,
    description: 'CNPJ',
  },
  {
    id: 2,
    description: 'CPF',
  },
];
