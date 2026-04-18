import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { brainCircuit, Mail, Lock, ArrowRight} from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {

    const [email, setEmail] = useState('alex@timetoprogram.com');
    const [password, serPassword] = useState('Test@123')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const

    return (
        <div>LoginPage</div>
    )
}
export default LoginPage