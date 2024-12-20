﻿import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function InvoiceRedirect() {
    const navigate = useNavigate();
    const location = useLocation();
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (!hasRedirected.current) {
            const params = new URLSearchParams(location.search);
            const invoiceId = params.get("invoiceId");
            const total = params.get("total");
            const invDate = params.get("invDate");
            const orderId = params.get("orderId");

            navigate(`/veterinaPage/invoice?invoiceId=${invoiceId}&total=${total}&invDate=${invDate}&orderId=${orderId}`, { replace: true });
            hasRedirected.current = true;
        }
    }, [navigate, location]);

    return null;
}

export default InvoiceRedirect;