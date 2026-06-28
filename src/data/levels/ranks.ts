import type { RankInfo } from '@/types';

export const RANKS: RankInfo[] = [
  {
    id: 'auxiliary',
    label: 'Auxiliar Administrativo',
    minXP: 0,
    description: 'Recibes solicitudes básicas de ciudadanos y realizas trámites de ventanilla.',
    unlockedMechanics: ['basic-cases', 'document-management'],
  },
  {
    id: 'analyst',
    label: 'Analista',
    minXP: 500,
    description: 'Analizas expedientes complejos y propones soluciones técnicas.',
    unlockedMechanics: ['complex-cases', 'data-analysis', 'reports'],
  },
  {
    id: 'coordinator',
    label: 'Coordinador',
    minXP: 1500,
    description: 'Coordinas equipos y procesos interinstitucionales.',
    unlockedMechanics: ['interoperability', 'team-management', 'inter-agency'],
  },
  {
    id: 'director',
    label: 'Director',
    minXP: 3000,
    description: 'Diriges una unidad y defines políticas internas.',
    unlockedMechanics: ['policy-decisions', 'budget-allocation', 'public-contracting'],
  },
  {
    id: 'viceminister',
    label: 'Viceministro',
    minXP: 6000,
    description: 'Supervisas la transformación digital de toda la cartera ministerial.',
    unlockedMechanics: ['strategic-decisions', 'digital-transformation', 'ai-governance'],
  },
  {
    id: 'minister',
    label: 'Ministro',
    minXP: 10000,
    description: 'Tomas decisiones de alto impacto que afectan a toda la ciudadanía.',
    unlockedMechanics: ['all', 'cabinet-decisions', 'international-cooperation'],
  },
];
