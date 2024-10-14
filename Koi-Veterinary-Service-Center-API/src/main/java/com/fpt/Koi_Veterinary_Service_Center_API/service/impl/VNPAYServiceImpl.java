package com.fpt.Koi_Veterinary_Service_Center_API.service.impl;

import com.fpt.Koi_Veterinary_Service_Center_API.exception.AppException;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IVNPAYService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

@Service
public class VNPAYServiceImpl implements IVNPAYService {
    @Override
    public ResponseEntity<String> payment(int price) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);
        String vnp_ExpireDate = createDate.plusMinutes(15).format(formatter);
        Map<String, String> vnpParams = new TreeMap<>();
        vnpParams.put("vnp_Version", "2.1.0");
        vnpParams.put("vnp_Command", "pay");
        vnpParams.put("vnp_TmnCode", "KRU0VWHL");
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_CurrCode", "VND");
        vnpParams.put("vnp_TxnRef", UUID.randomUUID().toString());
        vnpParams.put("vnp_OrderInfo", "Veterinarian Payment" );
        vnpParams.put("vnp_OrderType", "other");
        vnpParams.put("vnp_Amount", String.valueOf(price));
        vnpParams.put("vnp_ReturnUrl", "https://localhost:8080/api/payment-success");
        vnpParams.put("vnp_CreateDate", formattedCreateDate);
        vnpParams.put("vnp_ExpireDate", vnp_ExpireDate);
        vnpParams.put("vnp_IpAddr", "127.0.0.1");

        StringBuilder signDataBuilder = new StringBuilder();
        signUrl(vnpParams, signDataBuilder);
        String signData = signDataBuilder.toString();

        String signed;
        try {
            signed = generateHMAC("1FXUEZY7KIWXZT4CPAR84IGWEVQX72ZD", signData);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new AppException("HMAC fail");
        }

        vnpParams.put("vnp_SecureHash", signed);

        StringBuilder urlBuilder = new StringBuilder("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html");
        urlBuilder.append("?");
        signUrl(vnpParams, urlBuilder);

        return ResponseEntity.ok(urlBuilder.toString());
    }

    private void signUrl(Map<String, String> vnpParams, StringBuilder signDataBuilder) {
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1); // Remove last '&'
    }

    private String generateHMAC(String secretKey, String signData) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac hmacSha512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmacSha512.init(keySpec);
        byte[] hmacBytes = hmacSha512.doFinal(signData.getBytes(StandardCharsets.UTF_8));

        StringBuilder result = new StringBuilder();
        for (byte b : hmacBytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    public String paymentSuccess(String responseCode) {

        if (!responseCode.equals("00")) {
            throw new AppException("Payment fail");
        }
        return "success";
    }
}
