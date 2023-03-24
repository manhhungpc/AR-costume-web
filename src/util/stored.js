import { persisted } from 'svelte-local-storage-store';

export const stored = persisted('token', '');
