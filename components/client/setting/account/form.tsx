'use client';

import { SettingPasswordDialog, SettingUsernameDialog, SettingUsernameForm } from '@/components/client/setting';
import { InputWithIcon } from '@ui/input';
import { AtSignIcon, SquareAsteriskIcon } from 'lucide-react';
import { useState } from 'react';

interface SettingAccountFormProps {
  session: Session;
}

export default function SettingAccountForm({ session }: Readonly<SettingAccountFormProps>) {
  const [usernameDialogOpen, setUsernameDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="inline-block text-sm font-medium leading-none">이메일</label>
        <InputWithIcon icon={AtSignIcon} type={'email'} value={session.email} disabled />
      </div>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <label className="inline-block text-sm font-medium leading-none">유저네임</label>
          <div className="flex gap-2">
            <InputWithIcon icon={AtSignIcon} type={'email'} value={session.username} disabled />
            <SettingUsernameDialog open={usernameDialogOpen} onOpenChange={setUsernameDialogOpen}>
              <SettingUsernameForm username={session.username} closeDialog={() => setUsernameDialogOpen(false)} />
            </SettingUsernameDialog>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label className="inline-block text-sm font-medium leading-none">비밀번호</label>
          <div className="flex gap-2">
            <InputWithIcon icon={SquareAsteriskIcon} type={'password'} value={'no-password-use-otp'} disabled />
            <SettingPasswordDialog />
          </div>
        </div>
      </div>
    </div>
  );
}
