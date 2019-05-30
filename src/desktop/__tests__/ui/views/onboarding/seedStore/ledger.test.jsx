describe('Onboarding ledger view', () => {
    test(
        'Render view',
        async () => {
            const snapshot = await global.__screenshot('onboarding/seed-ledger', false);

            expect(snapshot).toMatchImageSnapshot({
                customSnapshotsDir: `${__dirname}/__snapshots__/`,
                customDiffConfig: { threshold: 1 },
                customSnapshotIdentifier: 'ledger.test.jsx',
            });
        },
        10000,
    );
});
