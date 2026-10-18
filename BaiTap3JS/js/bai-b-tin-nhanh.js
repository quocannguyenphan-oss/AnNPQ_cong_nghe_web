/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const danhSachTin = document.getElementById("list");
const oTimTin = document.getElementById("o-tim-kiem");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDeTin = document.getElementById("tin-tieu-de");
const oNoiDungTin = document.getElementById("tin-noi-dung");
const nutDangTin = document.getElementById("nut-dang");
const baoLoiTin = document.getElementById("bao-loi");

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem() {
        const cacTin = danhSachTin.querySelectorAll("li");
        const soTinHien = danhSachTin.querySelectorAll("li:not(.an)").length;
        boDem.textContent = `Đang hiển thị ${soTinHien}/${cacTin.length} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
        const tuKhoa = oTimTin.value.toLowerCase();
        const cacTin = danhSachTin.querySelectorAll("li");
        let soTinHien = 0;

        for (const tin of cacTin) {
                const vanBan = tin.querySelector("h3").textContent + " " + tin.querySelector("p").textContent;
                const khop = vanBan.toLowerCase().includes(tuKhoa);
                tin.classList.toggle("an", !khop);
                if (khop) soTinHien++;
        }

        if (soTinHien === 0) {
                khongThay.textContent = `Không tìm thấy tin nào cho "${oTimTin.value}"`;
                khongThay.classList.remove("an");
        } else {
                khongThay.classList.add("an");
        }
        capNhatBoDem();
}

oTimTin.addEventListener("keyup", locTin);
locTin();

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
danhSachTin.addEventListener("click", (e) => {
        if (!e.target.matches("button.more")) return;
        const doanVan = e.target.closest("li").querySelector("p");
        const dangMo = doanVan.classList.toggle("day-du");
        e.target.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDangTin.addEventListener("click", () => {
        const tieuDe = oTieuDeTin.value;
        const noiDung = oNoiDungTin.value;
        if (!tieuDe.trim() || !noiDung.trim()) {
                baoLoiTin.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
                return;
        }

        const tinMoi = document.createElement("li");
        const ngayDang = document.createElement("span");
        ngayDang.className = "time";
        ngayDang.textContent = homNay();
        const tieuDeMoi = document.createElement("h3");
        tieuDeMoi.textContent = tieuDe;
        const noiDungMoi = document.createElement("p");
        noiDungMoi.textContent = noiDung;
        const nutXemThem = document.createElement("button");
        nutXemThem.type = "button";
        nutXemThem.className = "more";
        nutXemThem.textContent = "Read more >>";

        tinMoi.append(ngayDang, tieuDeMoi, noiDungMoi, nutXemThem);
        danhSachTin.prepend(tinMoi);
        oTieuDeTin.value = "";
        oNoiDungTin.value = "";
        baoLoiTin.textContent = "";
        locTin();
});