import {useDeleteFolder, useEditItemName} from '@/Composables/useDocumentsClientMethods'
import {Notify} from 'quasar'
import {Document} from '@/Types/Document'

export async function useDeleteItemFromOptionList(folderId: number, callback?: () => void) {
    try {
        await useDeleteFolder(folderId)
        Notify.create({message: 'Se ha eliminado la carpeta', color: 'blue', type: 'positive', position: 'top-right'})
        !!callback && callback()
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error, intentalo de nuevo', color: 'red', type: 'negative', position: 'top-right'})
    }
}

export async function useEditItemNameFromOptionList(item: Document,newFolderName: string, callback?: () => void) {
    if (!newFolderName.trim()) return
    try {
        await useEditItemName(item, newFolderName)
        Notify.create({message: 'El nombre ha sido editado', color: 'blue', type: 'positive', position: 'top-right'})
        !!callback && callback()
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red', type: 'negative', position: 'top-right'})
    }
}
