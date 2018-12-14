let tools = {
    rotate({
        ctx,
        deg,
        callback
    }) {
        if (!ctx) throw new Error('ctx is not a context of canvas');
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.rotate(deg);
        callback && callback(ctx);
        ctx.restore();
    },
    translate() {},
    scale() {},
    clip() {},
    radiusRect({
        ctx,
        w,
        h,
        x,
        y,
        r,
        type,
        transform,
        pattern,
        deg = 0,
        translate = [0, 0]
    }) {
        if (!ctx) throw new Error('ctx is not a context of canvas');
        ctx.save();

        ctx.fillStyle = pattern;
        ctx.translate(...translate);
        ctx.rotate(deg);
        ctx.beginPath();
        ctx.moveTo(x, y + r);
        ctx.arc(x + r, y + r, r, Math.PI * 180 / 180, Math.PI * 270 / 180);
        ctx.lineTo(x + w - r, y);
        ctx.arc(x + w - r, y + r, r, Math.PI * 270 / 180, Math.PI * 360 / 180);
        ctx.lineTo(x + w, y + h - r);
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 90 / 180);
        ctx.lineTo(x + r, y + h);
        ctx.arc(x + r, y + h - r, r, Math.PI * 90 / 180, Math.PI * 180 / 180);
        ctx.closePath(); // as lineTo(x, y + r)
        ctx.fill();

        ctx.restore();
    },
    radiusRect2({
        ctx,
        w,
        h,
        x,
        y,
        r,
        type,
        transform
    }) {
        if (!ctx) throw new Error('ctx is not a context of canvas');
        ctx.save();

        ctx.strokeStyle = '#111';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y + r);
        ctx.arcTo(x, y, x + w - r, y, r);
        ctx.arcTo(x + w, y, x + w, y + h - r, r);
        ctx.arcTo(x + w, y + h, x + r, y + h, r);
        ctx.arcTo(x, y + h, x, y + r, r);
        ctx.closePath(); // as lineTo(x, y + r)
        ctx.stroke();

        ctx.restore();
    }
};

export default tools;
