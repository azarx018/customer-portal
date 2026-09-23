<script lang="ts">
	import type { PaymentStatus } from '$lib/types';

	export let status: PaymentStatus;

	const config: Record<PaymentStatus, { label: string; dot: string; text: string }> = {
		pending: { label: 'Checking...', dot: 'bg-gold animate-pulse', text: 'text-gold-deep' },
		paid: { label: 'Pembayaran diterima', dot: 'bg-signal', text: 'text-signal' },
		failed: { label: 'Pembayaran gagal', dot: 'bg-danger', text: 'text-danger' },
		expired: { label: 'Waktu pembayaran habis', dot: 'bg-danger', text: 'text-danger' }
	};

	$: current = config[status];
</script>

<div class="flex items-center gap-2 text-sm {current.text}" role="status">
	<span class="h-2 w-2 rounded-full {current.dot}" aria-hidden="true"></span>
	{current.label}
</div>
