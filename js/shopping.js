// Inisialisasi keranjang belanja dari localStorage atau buat baru jika belum ada
let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

// Fungsi untuk menambahkan item ke keranjang
function tambahKeKeranjang(nama, harga) {
    keranjang.push({ nama, harga });
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    updateKeranjangUI();
    // Tampilkan notifikasi
    alert('Produk berhasil ditambahkan ke keranjang!');
}

// Fungsi untuk menghapus item dari keranjang
function hapusItem(index) {
    keranjang.splice(index, 1);
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    updateKeranjangUI();
}

// Fungsi untuk memformat harga ke format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(angka);
}

// Fungsi untuk mengupdate tampilan keranjang
function updateKeranjangUI() {
    const keranjangContainer = document.getElementById('keranjang-items');
    const totalElement = document.getElementById('total-harga');
    
    if (!keranjangContainer) return; // Jika bukan di halaman keranjang
    
    // Kosongkan container
    keranjangContainer.innerHTML = '';
    
    // Hitung total
    let total = 0;
    
    // Tampilkan setiap item
    keranjang.forEach((item, index) => {
        total += item.harga;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'card mb-3';
        itemElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="card-title mb-0">${item.nama}</h6>
                        <p class="card-text text-muted">${formatRupiah(item.harga)}</p>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="hapusItem(${index})">
                        Hapus
                    </button>
                </div>
            </div>
        `;
        
        keranjangContainer.appendChild(itemElement);
    });
    
    // Update total
    if (totalElement) {
        totalElement.textContent = formatRupiah(total);
    }
}

// Fungsi untuk menampilkan modal checkout
function checkout() {
    if (keranjang.length === 0) {
        alert('Keranjang belanja masih kosong!');
        return;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    modal.show();
}

// Fungsi untuk memproses checkout
function prosesCheckout() {
    const form = document.getElementById('checkoutForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Simulasi proses checkout
    alert('Terima kasih atas pembelian Anda! Kami akan mengirimkan instruksi pembayaran ke email Anda.');
    
    // Kosongkan keranjang
    keranjang = [];
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    
    // Tutup modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    modal.hide();
    
    // Update UI
    updateKeranjangUI();
}

// Update UI saat halaman dimuat
document.addEventListener('DOMContentLoaded', updateKeranjangUI); 