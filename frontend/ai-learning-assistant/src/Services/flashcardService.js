import axioInstance from "../utils/axioInstance";
import { API_PATHS } from "../utils/apiPaths";

const getFlashcards = async () => {
    try {
        const response = await axioInstance.get(API_PATHS.FLASHCARDS.GET_ALL_FLASHCARD_SETS);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch flashcards sets' }
    }
};

const getFlashcardsForDocument = async (documentId) => {
    try {
        const response = await axioInstance.get(API_PATHS.FLASHCARDS.GET_FLASHCARDS_FOR_DOC(documentId));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch flashcards' }
    }
};

const reviewFlashcard = async (cardId, cardIndex) => {
    try {
        const response = await axioInstance.post(API_PATHS.FLASHCARDS.REVIEW_FLASHCARD(cardId), { cardIndex });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to review flashcard' }
    }
};

const toggleStar = async (cardId) => {
    try {
        const response = await axioInstance.post(API_PATHS.FLASHCARDS.TOGGLE_STAR(cardId));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to star flashcard' }
    }
};

const deleteFlashcardSet = async (id) => {
    try {
        const response = await axioInstance.delete(API_PATHS.FLASHCARDS.DELETE_FLASHCARD_SET(id));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to delete flashcard' }
    }
};

const flashcardService = {
    getFlashcards,
    getFlashcardsForDocument,
    reviewFlashcard,
    toggleStar,
    deleteFlashcardSet,
};

export default flashcardService;