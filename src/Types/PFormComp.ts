import PForm from '@/components/Organism/PForm.vue'
export default interface PFormComp {
    validate: () => boolean,
    component: typeof PForm
}
