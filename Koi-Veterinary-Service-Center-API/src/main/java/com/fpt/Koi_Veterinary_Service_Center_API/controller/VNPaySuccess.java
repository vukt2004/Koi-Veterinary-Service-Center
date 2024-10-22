package com.fpt.Koi_Veterinary_Service_Center_API.controller;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.invoiceResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IVNPAYService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api")
public class VNPaySuccess {
    @Autowired
    private IVNPAYService ivnpayService;

    @GetMapping("/payment-success")
    public String paymentSuccess(@RequestParam("vnp_OrderInfo") String orderId, @RequestParam("vnp_Amount") String Total, @RequestParam("vnp_ResponseCode") String responseCode) {
        invoiceResponse response = ivnpayService.paymentSuccess(responseCode, Total, orderId);
        String url = String.format("https://localhost:5173/invoice?invoiceId=%s&total=%s&invDate=%s&orderId=%s",
                response.getInvoiceId(),response.getTotal(),response.getInvDate(),response.getOrderId());
        return "redirect:" + url;
    }
}
