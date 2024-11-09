import './css/FAQ.css';
import { useState } from 'react';
function FAQ() {
  const faqData = [
      {
        question: "Trung tâm chăm sóc cá koi cung cấp những dịch vụ gì?",
        answer: "Chúng tôi cung cấp dịch vụ vệ sinh ao, kiểm tra sức khỏe cá, hướng dẫn cho ăn và đánh giá chất lượng nước.",
      },
      {
        question: "Tôi nên vệ sinh ao cá Koi bao lâu một lần?",
        answer: "Chúng tôi khuyên bạn nên làm sạch 4 - 6 tháng một lần, tùy thuộc vào kích thước ao và quần thể cá.",
      },
      {
        question: "Quy trình đặt dịch vụ như thế nào?",
        answer: "Bạn có thể đặt dịch vụ thông qua trang web của chúng tôi, gọi cho chúng tôi hoặc đến trung tâm của chúng tôi để đặt lịch hẹn trực tiếp.",
      },
      {
        question: "Bạn có cung cấp dịch vụ khẩn cấp cho các vấn đề sức khỏe cá koi không?",
        answer: "Có, chúng tôi cung cấp dịch vụ khẩn cấp cho các vấn đề sức khỏe cá koi. Vui lòng liên hệ ngay hotline của chúng tôi nếu bạn nhận thấy dấu hiệu bệnh.",
      },
    ];
  
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleAnswer = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    return (
      <div className="faq">
        <h2>Những Câu Hỏi Thường Gặp</h2>
        <ul>
          {faqData.map((item, index) => (
            <li key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <button onClick={() => toggleAnswer(index)} className="faq-question">
                {item.question}
              </button>
              {activeIndex === index && (
                <p className="faq-answer">
                  {item.answer}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default FAQ;
