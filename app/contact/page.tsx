'use client';
// app/contact/page.tsx - Trang Liên Hệ
// Cần 'use client' vì có state quản lý form (tên, email, nội dung)
// Và cần xử lý sự kiện submit

import { useState } from 'react';

// Kiểu dữ liệu cho form
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Trạng thái gửi form
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  // ===== STATE =====
  // Dữ liệu form
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Trạng thái gửi: 'idle' | 'sending' | 'success' | 'error'
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  // Lưu lỗi của từng trường (vd: { email: "Email không hợp lệ" })
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // ===== HÀM KIỂM TRA DỮ LIỆU =====
  function validateForm(): boolean {
    const newErrors: Partial<FormData> = {};

    // Kiểm tra tên
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên của bạn';
    }

    // Kiểm tra email
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      // Regex kiểm tra định dạng email
      newErrors.email = 'Email không đúng định dạng (vd: ten@gmail.com)';
    }

    // Kiểm tra nội dung
    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung tin nhắn';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Nội dung phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    // Trả về true nếu không có lỗi
    return Object.keys(newErrors).length === 0;
  }

  // ===== HÀM XỬ LÝ SUBMIT FORM =====
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Ngăn form reload trang

    // Kiểm tra dữ liệu trước khi gửi
    if (!validateForm()) return;

    // Chuyển sang trạng thái "đang gửi"
    setSubmitStatus('sending');

    // Giả lập gửi email (thực tế cần kết nối với backend hoặc dịch vụ email)
    // setTimeout giả lập thời gian chờ server phản hồi
    setTimeout(() => {
      // Giả lập thành công 90% trường hợp
      const success = Math.random() > 0.1;
      setSubmitStatus(success ? 'success' : 'error');

      // Reset form sau khi gửi thành công
      if (success) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      }
    }, 1500);
  }

  // ===== HÀM XỬ LÝ THAY ĐỔI INPUT =====
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    // Cập nhật trường tương ứng trong formData
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi của trường này khi người dùng bắt đầu nhập
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  // ===== RENDER =====
  return (
    <div className="page-enter">

      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-teal-950 to-slate-900 py-12 border-b-4 border-teal-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h1
            className="font-pixel text-teal-300 text-base sm:text-xl mb-4"
            style={{ textShadow: '2px 2px 0px #0f3d3a' }}
          >
            Liên Hệ
          </h1>
          <p className="text-teal-200 text-base sm:text-lg max-w-2xl mx-auto">
            Có câu hỏi, góp ý hoặc muốn gợi ý mod hay?
            Hãy nhắn tin cho chúng mình nhé!
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">

          {/* ===== CỘT TRÁI: THÔNG TIN LIÊN HỆ ===== */}
          <div className="md:col-span-1 space-y-4">
            <h2
              className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
              style={{ textShadow: '1px 1px 0px #15803d' }}
            >
              📬 Kênh Liên Hệ
            </h2>

            {/* Các card liên hệ */}
            {[
              {
                icon: '📧',
                title: 'Email',
                value: 'contact@mcworld.vn',
                desc: 'Phản hồi trong 24h',
                color: '#1d4ed8',
              },
              {
                icon: '💬',
                title: 'Discord',
                value: 'MCWorld VN',
                desc: 'Chat trực tiếp với cộng đồng',
                color: '#5865f2',
              },
              {
                icon: '📺',
                title: 'YouTube',
                value: 'Minecraft World VN',
                desc: 'Video hướng dẫn hàng tuần',
                color: '#dc2626',
              },
            ].map((channel) => (
              <div key={channel.title} className="mc-block bg-slate-800 p-4 flex gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl shrink-0 border-2 border-black"
                  style={{
                    backgroundColor: channel.color,
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.8)',
                  }}
                >
                  {channel.icon}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{channel.title}</div>
                  <div className="text-mc-green text-xs">{channel.value}</div>
                  <div className="text-gray-500 text-xs">{channel.desc}</div>
                </div>
              </div>
            ))}

            {/* Giờ phản hồi */}
            <div className="mc-block bg-slate-800 p-4 mt-4">
              <h3 className="text-mc-green font-bold text-sm mb-2">⏰ Giờ Phản Hồi</h3>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Thứ 2 - Thứ 6</span>
                  <span className="text-white">8:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Thứ 7 - Chủ nhật</span>
                  <span className="text-white">9:00 - 20:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== CỘT PHẢI: FORM LIÊN HỆ ===== */}
          <div className="md:col-span-2">

            {/* Thông báo thành công */}
            {submitStatus === 'success' && (
              <div className="mc-block bg-mc-dark-green p-6 mb-6 text-center">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="font-pixel text-white text-sm mb-2"
                    style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>
                  Gửi thành công!
                </h3>
                <p className="text-green-100 text-sm">
                  Cảm ơn bạn đã liên hệ! Chúng mình sẽ phản hồi sớm nhất có thể.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-4 mc-button bg-black text-mc-green text-xs"
                >
                  ✉️ Gửi tin nhắn khác
                </button>
              </div>
            )}

            {/* Thông báo lỗi */}
            {submitStatus === 'error' && (
              <div className="mc-block bg-red-900 p-4 mb-6">
                <p className="text-red-200 text-sm">
                  ❌ Có lỗi xảy ra khi gửi. Vui lòng thử lại sau!
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-2 text-xs text-red-300 hover:text-white underline"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* Form (ẩn đi khi đã gửi thành công) */}
            {submitStatus !== 'success' && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mc-block bg-slate-800 p-6 space-y-5">
                  <h2 className="font-bold text-mc-green text-base">Gửi Tin Nhắn</h2>

                  {/* Hàng 1: Tên và Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Tên */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Tên của bạn <span className="text-mc-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        className={`mc-input ${errors.name ? 'border-mc-red' : ''}`}
                        maxLength={50}
                      />
                      {/* Hiện lỗi nếu có */}
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email <span className="text-mc-red">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ten@gmail.com"
                        className={`mc-input ${errors.email ? 'border-mc-red' : ''}`}
                        maxLength={100}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Chủ đề */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Chủ đề
                    </label>
                    {/* Select dropdown */}
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mc-input"
                    >
                      <option value="">Chọn chủ đề...</option>
                      <option value="question">❓ Câu hỏi về Minecraft</option>
                      <option value="mod">⚙️ Góp ý về Mod/Map</option>
                      <option value="guide">📖 Yêu cầu thêm hướng dẫn</option>
                      <option value="bug">🐛 Báo lỗi website</option>
                      <option value="other">💬 Khác</option>
                    </select>
                  </div>

                  {/* Nội dung tin nhắn */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Nội dung <span className="text-mc-red">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Viết tin nhắn của bạn ở đây... (ít nhất 10 ký tự)"
                      rows={5}
                      className={`mc-input resize-none ${errors.message ? 'border-mc-red' : ''}`}
                      maxLength={1000}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message ? (
                        <p className="text-xs text-red-400">{errors.message}</p>
                      ) : (
                        <span /> // placeholder để justify-between hoạt động
                      )}
                      {/* Đếm ký tự */}
                      <p className="text-xs text-gray-500">
                        {formData.message.length}/1000 ký tự
                      </p>
                    </div>
                  </div>

                  {/* Nút gửi */}
                  <button
                    type="submit"
                    disabled={submitStatus === 'sending'}
                    className={`
                      mc-button w-full justify-center
                      ${submitStatus === 'sending'
                        ? 'bg-slate-600 cursor-not-allowed opacity-70'
                        : 'bg-mc-green text-black hover:bg-mc-dark-green'
                      }
                    `}
                  >
                    {submitStatus === 'sending' ? (
                      // Loading state: hiện spinner text
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Đang gửi...
                      </span>
                    ) : (
                      '📤 Gửi Tin Nhắn'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
