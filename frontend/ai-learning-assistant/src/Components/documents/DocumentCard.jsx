import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Trash2, BookOpen, BrainCircuit, Clock } from 'lucide-react';
import moment from 'moment';

// Helper function to format file size
const formatFileSize = (bytes) => {
    if (bytes === undefined || bytes === null) return 'N/A';

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
};

const DocumentCard = ({ document, onDelete }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate(`/documents/${document._id}`);  
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(document);
    };

  return <div>DocumentCard</div>;
}

export default DocumentCard;